import { React, useState, useEffect } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import api from "../../Services/config";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import "./roles.css";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [mainRole, setMainRole] = useState(null);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchRoles = async () => {
    try {
      const res = await api.get(`/api/Account/get-rolls`);
      setRoles(res.data);
    } catch (e) {
      console.log(e);
      if (e.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "خطای اینترنت",
          text: "لطفا وضعیت اتصال خود را بررسی کنید",
        });
      }
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const form = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("نام سمت الزامی است").min(2, "نام سمت باید حداقل 2 کاراکتر باشد"),
    }),
    onSubmit: (values) => {
      if (mainRole) {
        // ویرایش سمت
        (async () => {
          try {
            setLoading(true);
            const response = await api.post(
              `/api/Account/EditRole/${mainRole.id}`,
              {
                name: values.name,
              },
              {
                "X-HTTP-Method-Override": "PUT",
              }
            );
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: "عملیات با موفقیت انجام شد",
                text: "سمت با موفقیت ویرایش شد",
              });
              form.resetForm();
              setOpenEditModal(false);
              setMainRole(null);
              await fetchRoles();
              setCurrentPage(1);
            }
          } catch (e) {
            if (e.response?.status === 400) {
              Swal.fire({
                icon: "error",
                title: "خطا در انجام عملیات",
                text: e.response?.data?.message || "نام سمت تکراری است",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "خطا در انجام عملیات",
                text: "خطایی رخ داد",
              });
            }
          } finally {
            setLoading(false);
          }
        })();
      } else {
        // اضافه کردن سمت جدید
        (async () => {
          try {
            setLoading(true);
            const response = await api.post(`/api/Account/CreateRole`, {
              name: values.name,
            });
            if (response.status === 200 || response.status === 201) {
              Swal.fire({
                icon: "success",
                title: "عملیات با موفقیت انجام شد",
                text: "سمت با موفقیت اضافه شد",
              });
              form.resetForm();
              setOpenAddModal(false);
              await fetchRoles();
              setCurrentPage(1);
            }
          } catch (e) {
            if (e.response?.status === 400) {
              Swal.fire({
                icon: "error",
                title: "خطا در انجام عملیات",
                text: e.response?.data?.message || "نام سمت تکراری است",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "خطا در انجام عملیات",
                text: "خطایی رخ داد",
              });
            }
          } finally {
            setLoading(false);
          }
        })();
      }
    },
  });

  const editHandler = (role) => {
    setMainRole(role);
    form.setValues({
      name: role.name,
    });
    setOpenEditModal(true);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
    setMainRole(null);
    form.resetForm();
  };

  const addHandler = () => {
    setMainRole(null);
    form.resetForm();
    setOpenAddModal(true);
  };

  const closeAddModal = () => {
    setOpenAddModal(false);
    form.resetForm();
  };

  const showHandler = (role) => {
    setMainRole(role);
    setOpenShowModal(true);
  };

  const closeShowModal = () => {
    setOpenShowModal(false);
    setMainRole(null);
  };

  const deleteHandler = (id) => {
    Swal.fire({
      icon: "warning",
      title: "سمت حذف شود؟",
      text: "آیا از حذف سمت مطمئن هستید؟",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed) {
        (async () => {
          try {
            const response = await api.post(`/api/Account/DeleteRole/${id}`, undefined, {
              "X-HTTP-Method-Override": "DELETE",
            });
            Swal.fire({
              title: "عملیات با موفقیت انجام شد",
              text: "شما سمت مورد نظر را با موفقیت حذف کردید.",
              icon: "success",
            });
            await fetchRoles();
            setCurrentPage(1);
          } catch (e) {
            Swal.fire({
              icon: "error",
              title: "خطا در انجام عملیات",
              text: e.response?.data?.message || "خطایی در حذف سمت رخ داد",
            });
          }
        })();
      }
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(roles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoles = roles.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title">
            لیست سمت‌ها
            <Button color="primary" variant="contained" startIcon={<IoMdAdd />} className="table-actions__btn me-3">
              <Link to={"/dashboard/newRole"} style={{ color: "inherit", textDecoration: "none" }}>
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
                <th>نام سمت</th>
                <th>نام نرمال‌سازی شده</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {roles.length ? (
                currentRoles.map((role, index) => (
                  <tr key={role.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{role.name}</td>
                    <td>{role.normalizedName}</td>
                    <td>
                      <div className="table-actions d-flex align-items-center">
                        <Button onClick={() => showHandler(role)} color="secondary" variant="contained" startIcon={<FaEye />} className="table-actions__btn">
                          نمایش
                        </Button>
                        <Button onClick={() => editHandler(role)} color="success" variant="contained" startIcon={<FaPencil />} className="table-actions__btn">
                          ویرایش
                        </Button>
                        <Button onClick={() => deleteHandler(role.id)} color="error" variant="contained" startIcon={<MdDelete />} className="table-actions__btn">
                          حذف
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    <span className="loader"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {roles.length > 0 && (
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
          <div className="modal-wrapper">
            <RxCross2 onClick={closeShowModal} className="modall-cross" />
            <h3 className="modal-title">جزئیات سمت</h3>
            {mainRole && (
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <th>شناسه</th>
                    <td>{mainRole.id}</td>
                  </tr>
                  <tr>
                    <th>نام سمت</th>
                    <td>{mainRole.name}</td>
                  </tr>
                  <tr>
                    <th>نام نرمال‌سازی شده</th>
                    <td>{mainRole.normalizedName}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </Modal>
        {/* edit modal */}
        <Modal open={openEditModal} onClose={closeEditModal}>
          <div className="modal-wrapper">
            <RxCross2 onClick={closeEditModal} className="modall-cross" />
            <h3 className="modal-title">ویرایش سمت</h3>
            <form onSubmit={form.handleSubmit} dir="rtl">
              <div className="row align-items-center">
                <div className="col-12 col-md-12 mb-3">
                  <TextField
                    type="text"
                    label="نام سمت"
                    name="name"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.name}
                    error={form.touched.name && Boolean(form.errors.name)}
                    helperText={form.touched.name && form.errors.name}
                    className="input"
                    fullWidth
                  />
                </div>
                <div className="col-12 col-md-12 text-center my-3">
                  <Button className="ms-1" variant="contained" color="success" type="submit" disabled={loading}>
                    ثبت
                  </Button>
                  <Button onClick={closeEditModal} variant="contained" color="error" type="button" disabled={loading}>
                    انصراف
                  </Button>
                  <div>{loading && <span className="loader"></span>}</div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        {/* add modal */}
        <Modal open={openAddModal} onClose={closeAddModal}>
          <div className="modal-wrapper">
            <RxCross2 onClick={closeAddModal} className="modall-cross" />
            <h3 className="modal-title">اضافه کردن سمت جدید</h3>
            <form onSubmit={form.handleSubmit} dir="rtl">
              <div className="row align-items-center">
                <div className="col-12 col-md-12 mb-3">
                  <TextField
                    type="text"
                    label="نام سمت"
                    name="name"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.name}
                    error={form.touched.name && Boolean(form.errors.name)}
                    helperText={form.touched.name && form.errors.name}
                    className="input"
                    fullWidth
                  />
                </div>
                <div className="col-12 col-md-12 text-center my-3">
                  <Button className="ms-1" variant="contained" color="success" type="submit" disabled={loading}>
                    ثبت
                  </Button>
                  <Button onClick={closeAddModal} variant="contained" color="error" type="button" disabled={loading}>
                    انصراف
                  </Button>
                  <div>{loading && <span className="loader"></span>}</div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
