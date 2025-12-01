import { React, useState, useEffect } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import api from "../../Services/config";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import "./Users.css";

export default function Stock() {
  const [Users, setUsers] = useState([]);
  const [mainUser, setMainUser] = useState("");
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rols, setRols] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUserById = async (id) => {
    console.log("Fetching user by ID:", id);
    try {
      const res = await api.get(`/api/Account/GetUserById/${id}`);
      console.log("API Response:", res.data);
      setMainUser(res.data);
      return res.data;
    } catch (e) {
      console.error("Error fetching user:", e);
      if (e.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "خطای اینترنت",
          text: "لطفا وضعیت اتصال خود را بررسی کنید",
        }).then(() => {
          setLoading(false);
        });
      }
      return null;
    }
  };
  const fetchRolls = async () => {
    try {
      const res = await api.get(`/api/Account/get-rolls`);
      setRols(res.data);
      return res.data;
    } catch (e) {
      if (e.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "خطای اینترنت",
          text: "لطفا وضعیت اتصال خود را بررسی کنید",
        }).then(() => {
          setLoading(false);
        });
      }
      return [];
    }
  };
  const form = useFormik({
    initialValues: {
      phoneNumber: "",
      userName: "",
      newPassword: "",
      firstName: "",
      lastName: "",
      role: rols.length > 0 ? rols[0].name : "",
    },
    onSubmit: (values) => {
      (async () => {
        try {
          setLoading(true);
          const { phoneNumber, userName, newPassword, firstName, lastName, role } = values;
          const requestData = {
            phone: phoneNumber,
            userName,
            firstName,
            lastName,
            role,
          };
          // فقط اگر رمز جدید وارد شده باشد، آن را ارسال می‌کنیم
          if (newPassword && newPassword.trim() !== "") {
            requestData.newPassword = newPassword;
          }
          if (!mainUser || !mainUser.id) {
            Swal.fire({
              icon: "error",
              title: "خطا",
              text: "اطلاعات کاربر یافت نشد",
            });
            setLoading(false);
            return;
          }
          console.log("Editing user with ID:", mainUser.id);
          console.log("Main User object:", mainUser);
          console.log("Request data:", requestData);
          const response = await api.post(
            `/api/Account/EditUser/${mainUser.id}`,
            requestData,
            {
              headers: {
                "X-HTTP-Method-Override": "PUT",
              },
            }
          );
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "عملیات با موفقیت انجام شد",
              text: "کاربر با موفقیت ثبت شد",
            });
            form.resetForm();
            setOpenEditModal(false);
            setMainUser("");
            const res = await api.get("/api/Account/GetAllUsers");
            setUsers(res.data);
            setCurrentPage(1);
          }
        } catch (e) {
          console.error("Error editing user:", e);
          console.error("Error response data:", e.response?.data);
          console.error("Error response status:", e.response?.status);
          if (e.response?.status === 400) {
            const errorData = e.response?.data;
            console.log("Error data details:", JSON.stringify(errorData, null, 2));
            let errorMessage = "خطا در ویرایش کاربر";
            
            if (typeof errorData === 'string') {
              errorMessage = errorData;
            } else if (errorData?.message) {
              errorMessage = errorData.message;
            } else if (Array.isArray(errorData) && errorData.length > 0) {
              if (errorData[0]?.code === "PasswordTooShort") {
                errorMessage = "طول رمز حداقل باید 6 کاراکتر باشد";
              } else {
                errorMessage = errorData[0]?.description || errorData[0]?.message || errorMessage;
              }
            } else if (typeof errorData === 'object') {
              errorMessage = errorData.title || errorData.type || errorMessage;
            }
            
            Swal.fire({
              icon: "error",
              title: "خطا در انجام عملیات",
              text: errorMessage,
            });
          } else if (e.code === "ERR_NETWORK") {
            Swal.fire({
              icon: "error",
              title: "خطای اینترنت",
              text: "لطفا وضعیت اتصال خود را بررسی کنید",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "خطا در انجام عملیات",
              text: e.response?.data?.message || "خطایی رخ داد",
            });
          }
        } finally {
          setLoading(false);
        }
      })();
    },
    validationSchema: Yup.object().shape({
      phoneNumber: Yup.string().max(100, " شماره تلفن باید حداکثر 100 کاراکتر باشد"),
      userName: Yup.string(),
      newPassword: Yup.string("رمز حتما باید رشته باشد").min(6, "طول رمز حداقل باید 6 کاراکتر باشد"),
      firstName: Yup.string().required("نام الزامی است"),
      lastName: Yup.string().required("نام خانوادگی الزامی است"),
      role: Yup.string(),
    }),
  });
  const editHandler = async (id) => {
    console.log("User ID:", id);
    const rolesData = await fetchRolls();
    const userData = await fetchUserById(id);
    console.log("User Data:", userData);
    console.log("Roles Data:", rolesData);
    if (userData) {
      // تقسیم userfullname به firstName و lastName
      let firstName = "";
      let lastName = "";
      if (userData.userfullname) {
        const nameParts = userData.userfullname.trim().split(" ");
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(" ") || "";
      } else if (userData.firstName || userData.lastName) {
        firstName = userData.firstName || "";
        lastName = userData.lastName || "";
      }
      
      form.setValues({
        userName: userData.userName || "",
        newPassword: "",
        firstName: firstName,
        lastName: lastName,
        phoneNumber: userData.phoneNumber || "",
        role: userData.role || (rolesData.length > 0 ? rolesData[0].name : ""),
      });
      console.log("Form Values Set:", {
        userName: userData.userName || "",
        newPassword: "",
        firstName: firstName,
        lastName: lastName,
        phoneNumber: userData.phoneNumber || "",
        role: userData.role || (rolesData.length > 0 ? rolesData[0].name : ""),
      });
      setOpenEditModal(true);
    }
  };
  const closeEditModal = () => {
    setOpenEditModal(false);
    setMainUser("");
    form.resetForm();
  };

  // get all user
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/Account/GetAllUsers");
        setUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("useEffect triggered - mainUser:", mainUser, "openEditModal:", openEditModal);
    if (mainUser && typeof mainUser === 'object' && openEditModal) {
      console.log("Setting form values with mainUser:", mainUser);
      // تقسیم userfullname به firstName و lastName
      let firstName = "";
      let lastName = "";
      if (mainUser.userfullname) {
        const nameParts = mainUser.userfullname.trim().split(" ");
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(" ") || "";
      } else if (mainUser.firstName || mainUser.lastName) {
        firstName = mainUser.firstName || "";
        lastName = mainUser.lastName || "";
      }
      
      form.setValues({
        userName: mainUser.userName || "",
        newPassword: "",
        firstName: firstName,
        lastName: lastName,
        phoneNumber: mainUser.phoneNumber || "",
        role: mainUser.role || (rols.length > 0 ? rols[0].name : ""),
      });
    }
  }, [mainUser, openEditModal, rols]);

  const showHandler = (id) => {
    setOpenShowModal(true);
    const findedUser = Users.find((item) => item.id === id);
    setMainUser(findedUser);
    if (Users.length) {
      setMainUser(findedUser);
    }
  };
  const closeShowModal = () => setOpenShowModal(false);

  const deleteHandler = (id) => {
    Swal.fire({
      icon: "warning",
      title: "کاربر حذف شود؟",
      text: "آیا از حذف کاربر مطمئن هستید؟",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed) {
        (async () => {
          try {
            const response = await api.post(`/api/Account/DeleteUser/${id}`, undefined, {
              "X-HTTP-Method-Override": "DELETE",
            });
            Swal.fire({
              title: "عملیات با موفقیت انجام شد",
              text: "شما کاربر مورد نظر را با موفقیت حذف کردید.",
              icon: "success",
            });
            const res = await api.get("/api/Account/GetAllUsers");
            setUsers(res.data);
            setCurrentPage(1);
          } catch (e) {
            console.log(e);
          }
        })();
      }
    });
  };

  const resetFormData = () => {
    form.setValues({
      userName: "",
      newPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: rols[0]?.name || "",
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(Users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = Users.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title">
            لیست کاربران
            <Button color="primary" variant="contained" startIcon={<IoMdAdd />} className="table-actions__btn me-3">
              <Link to={"/dashboard/newUser"} style={{ color: "inherit", textDecoration: "none" }}>
                اضافه کردن
              </Link>
            </Button>
          </h4>
        </div>
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام کاربری</th>
                <th>نام و نام خانوادگی</th>
                <th>شماره پرسنلی</th>
                <th>شماره تلفن</th>
                <th>سمت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {Users.length ? (
                currentUsers.map((mainUser, index) => (
                  <tr key={mainUser.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{mainUser.userName}</td>
                    <td>{mainUser.userfullname || "-"}</td>
                    <td>{mainUser.personnelCode}</td>
                    <td>{mainUser.phoneNumber || "-"}</td>
                    <td>{mainUser.role}</td>
                    <td>
                      <div className="table-actions d-flex align-items-center">
                        <Button onClick={() => showHandler(mainUser.id)} color="secondary" variant="contained" startIcon={<FaEye />} className="table-actions__btn">
                          نمایش
                        </Button>
                        <Button onClick={() => {
                          console.log("Edit button clicked, User ID:", mainUser.id);
                          editHandler(mainUser.id);
                        }} color="success" variant="contained" startIcon={<FaPencil />} className="table-actions__btn">
                          ویرایش
                        </Button>
                        <Button onClick={() => deleteHandler(mainUser.id)} color="error" variant="contained" startIcon={<MdDelete />} className="table-actions__btn">
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <span className="loader"></span>{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {Users.length > 0 && (
          <Stack spacing={2} className="mt-4 d-flex align-items-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                },
                "& .MuiPaginationItem-page": {
                  color: "white",
                },
                "& .MuiPaginationItem-icon": {
                  color: "white",
                },
                "& .Mui-selected": {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            />
          </Stack>
        )}
        {/* show modal */}
        <Modal open={openShowModal} onClose={closeShowModal}>
          <>
            <div className="modal-wrapper">
              <RxCross2 onClick={closeShowModal} className="modall-cross" />
              <h3 className="modal-title">لیست کاربران</h3>
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <th>نام کاربری</th>
                    <td>{mainUser.userName || "-"}</td>
                  </tr>
                  <tr>
                    <th>نام و نام خانوادگی</th>
                    <td>{mainUser.userfullname || "-"}</td>
                  </tr>
                  <tr>
                    <th>شماره پرسنلی</th>
                    <td>{mainUser.personnelCode || "-"}</td>
                  </tr>
                  <tr>
                    <th>کد ملی</th>
                    <td>{mainUser.nationalCode || "-"}</td>
                  </tr>
                  <tr>
                    <th>شماره تلفن</th>
                    <td>{mainUser.phoneNumber || "-"}</td>
                  </tr>
                  <tr>
                    <th>نقش</th>
                    <td>{mainUser.role || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        </Modal>
        {/* edit modal */}
        <Modal open={openEditModal} onClose={closeEditModal}>
          <>
            <div className="modal-wrapper">
              <RxCross2 onClick={closeEditModal} className="modall-cross" />
              <h3 className="modal-title">ویرایش کاربر</h3>
              <form onSubmit={form.handleSubmit} dir="rtl">
                <div className="row align-items-center">
                  <div className="col-12 col-md-4 mb-3">
                    <TextField type="text" label="نام کاربری" name="userName" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.userName} error={form.touched.userName && Boolean(form.errors.userName)} helperText={form.touched.userName && form.errors.userName} className="input" />
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <TextField type="text" label="رمز" name="newPassword" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.newPassword} error={form.touched.newPassword && Boolean(form.errors.newPassword)} helperText={form.touched.newPassword && form.errors.newPassword} className="input" />
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <TextField type="text" label="نام" name="firstName" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.firstName} error={form.touched.firstName && Boolean(form.errors.firstName)} helperText={form.touched.firstName && form.errors.firstName} className="input" />
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <TextField type="text" label="نام خانوادگی" name="lastName" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.lastName} error={form.touched.lastName && Boolean(form.errors.lastName)} helperText={form.touched.lastName && form.errors.lastName} className="input" />
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <TextField type="text" label="شماره موبایل" name="phoneNumber" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.phoneNumber} error={form.touched.phoneNumber && Boolean(form.errors.phoneNumber)} helperText={form.touched.phoneNumber && form.errors.phoneNumber} className="input" />
                  </div>

                  <div className="col-12 col-md-4 mb-3">
                    <FormControl className="input" fullWidth error={form.touched.role && Boolean(form.errors.role)}>
                      <InputLabel id="demo-simple-select-label">نقش</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={form.values.role} name="role" label="شروع شده؟" onChange={form.handleChange} onBlur={form.handleBlur}>
                        {rols.map((item) => (
                          <MenuItem value={item.name} key={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {form.touched.role && form.errors.role && <FormHelperText>{form.errors.role}</FormHelperText>}
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-12 text-center my-3">
                    <Button className="ms-1" variant="contained" color="success" type="submit">
                      ثبت
                    </Button>
                    <Button onClick={form.resetForm} variant="contained" color="error" type="button">
                      بازنشانی
                    </Button>
                    <div>{loading && <span className="loader"></span>}</div>
                  </div>
                </div>
              </form>
            </div>
          </>
        </Modal>
      </div>
    </div>
  );
}
