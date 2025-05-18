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

  const fetchUserById = async (id) => {
    try {
      const res = await api.get(`/api/Account/GetUserById/${id}`);
      setMainUser(res.data);
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
    }
  };
  const fetchRolls = async () => {
    try {
      const res = await api.get(`/api/Account/get-rolls`);
      setRols(res.data);
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
    }
  };
  const form = useFormik({
    initialValues: {
      phone: "",
      userName: "",
      newPassword: "",
      email: "",
      role: rols.length > 0 ? rols[0].userName : "",
    },
    onSubmit: (values) => {
      (async () => {
        try {
          setLoading(true);
          const { phone, userName, newPassword, email, role } = values;
          const response = await api.post(
            `/api/Account/EditUser/${mainUser.id}`,
            {
              phone,
              userName,
              newPassword,
              email,
              role,
            },
            {
              "X-HTTP-Method-Override": "PUT",
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
          }
        } catch (e) {
          if (e.status === 400) {
            if (e.response.data[0].code === "PasswordTooShort") {
              Swal.fire({
                icon: "error",
                title: "خطا در انجام عملیات",
                text: "طول رمز حداقل باید 6 کاراکتر باشد",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "خطا در انجام عملیات",
                text: "نام کاربری تکراری است",
              });
            }
            form.resetForm();
          }
        } finally {
          setLoading(false);
        }
      })();
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().max(100, " نام باید حداکثر 100 کاراکتر باشد"),
      userName: Yup.string(),
      newPassword: Yup.string("رمز حتما باید رشته باشد").min(6, "طول رمز حداقل باید 6 کاراکتر باشد"),
      email: Yup.string().email("لطفا ایمیل معتبری وارد کنید"),
      role: Yup.string(),
    }),
  });
  const editHandler = async (id) => {
    await fetchRolls();
    await fetchUserById(id);
    setOpenEditModal(true);
    console.log(mainUser)
  };
  const closeEditModal = () => setOpenEditModal(false);

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
    if (mainUser) {
      form.setValues({
        userName: mainUser.userName,
        newPassword: mainUser.newPassword,
        email: mainUser.email,
        phone: mainUser.phone,
        role: mainUser.role,
      });
    }
  }, [mainUser]);

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
      email: "",
      phone: "",
      role: rols[0].name,
    });
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
                <th>شماره پرسنلی</th>
                <th>ایمیل</th>
                <th>شماره تلفن</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {Users.length ? (
                Users.map((mainUser, index) => (
                  <tr key={mainUser.id}>
                    <td>{index + 1}</td>
                    <td>{mainUser.userName}</td>
                    <td>{mainUser.personnelCode}</td>
                    <td>{mainUser.email}</td>
                    <td>{mainUser.phone}</td>
                    <td>
                      <div className="table-actions d-flex align-items-center">
                        <Button onClick={() => showHandler(mainUser.id)} color="secondary" variant="contained" startIcon={<FaEye />} className="table-actions__btn">
                          نمایش
                        </Button>
                        <Button onClick={() => editHandler(mainUser.id)} color="success" variant="contained" startIcon={<FaPencil />} className="table-actions__btn">
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
                  <td colSpan={8}>
                    <span className="loader"></span>{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                    <td>{mainUser.userName}</td>
                  </tr>
                  <tr>
                    <th>شماره پرسنلی</th>
                    <td>{mainUser.personnelCode}</td>
                  </tr>
                  <tr>
                    <th>ایمیل</th>
                    <td>{mainUser.email}</td>
                  </tr>
                  <tr>
                    <th>شماره تلفن</th>
                    <td>{mainUser.phone}</td>
                  </tr>
                  <tr>
                    <th>ایمیل تایید شده؟</th>
                    <td>{mainUser.emailConfirmed ? "بله" : "خیر"}</td>
                  </tr>
                  <tr>
                    <th>شماره موبایل تایید شده؟</th>
                    <td>{mainUser.phoneNumberConfirmed ? "بله" : "خیر"}</td>
                  </tr>
                  <tr>
                    <th>تایید دو مرحله ای</th>
                    <td>{mainUser.phoneNumberConfirmed ? "بله" : "خیر"}</td>
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
                    <TextField type="text" label="ایمیل" name="email" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.email} error={form.touched.email && Boolean(form.errors.email)} helperText={form.touched.email && form.errors.email} className="input" />
                  </div>
                  <div className="col-12 col-md-4 mb-3">
                    <TextField type="text" label="شماره موبایل" name="phone" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.phone} error={form.touched.phone && Boolean(form.errors.phone)} helperText={form.touched.phone && form.errors.phone} className="input" />
                  </div>

                  <div className="col-12 col-md-8 mb-3">
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
