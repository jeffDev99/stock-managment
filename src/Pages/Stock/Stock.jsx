import { React, useState, useEffect } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Link, useNavigate  } from "react-router-dom";
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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import "./Stock.css";

export default function Stock() {
  const [stock, setStock] = useState([]);
  const [mainstock, setMainstock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openShowModal, setOpenShowModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      stockName: "",
      year: "",
      startingDate: "",
      finishDate: "",
      isClosed: true,
      isStarted: 0,
    },
    onSubmit: (values) => {
      (async () => {
        try {
          const valueWithId = { ...values, stockID: mainstock.stockID };

          const response = await fetch(updatestock(mainstock.stockID), {
            method: "PUT",
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(valueWithId),
          });
          const data = await response.text();
          if (response.ok) {
            setOpenEditModal(false);
            Swal.fire({
              icon: "success",
              title: "سال مالی بروزرسانی شد",
              text: "شما سال مالی خود را با موفقیت بروزرسانی کردید",
            });
          } else if (response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "خطا در ثبت سال مالی",
              text: "لطفا ورودی ها خود را بررسی کنید",
            });
            resetFormData();
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },
    validationSchema: Yup.object().shape({
      stockName: Yup.string().min(5, "سال مالی باید حداقل 5 کاراکتر باشد").max(100, "سال مالی باید حداکثر 100 کاراکتر باشد").required("سال مالی الزامی است"),
      year: Yup.number().required("سال الزامی است"),
      startingDate: Yup.string().required("تاریخ شروع سال مالی الزامی است"),
      finishDate: Yup.string().required("تاریخ پایان سال مالی الزامی است"),
      isStarted: Yup.number().required("این فیلد الزامی است"),
    }),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/Stock/get-stocks");
        setStock(res.data);
      } catch (e) {
        if (e.code === "ERR_NETWORK") {
          Swal.fire({
            icon: "error",
            title: "خطای اینترنت",
            text: "لطفا وضعیت اتصال خود را بررسی کنید",
          }).then(() => {
            setLoading(false)
          });
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (mainstock) {
      form.setValues({
        stockName: mainstock.stockName || "",
        year: mainstock.year || "",
        startingDate: mainstock.startingDate || "",
        finishDate: mainstock.finishDate || "",
        isClosed: true,
        isStarted: mainstock.isStarted ? 1 : 0,
      });
    }
  }, [mainstock]);

  const showHandler = (stockID) => {
    setOpenShowModal(true);
    const findedStock = stock.find((item) => item.id === stockID);
    setMainstock(findedStock);
    if (stock.length) {
      setMainstock(findedStock);
    }
  };
  const closeShowModal = () => setOpenShowModal(false);

  const editHandler = (stockID) => {
    navigate(`/dashboard/editStock/${stockID}`)
  };
  const closeEditModal = () => setOpenEditModal(false);

  const deleteHandler = (stockID) => {
    Swal.fire({
      icon: "warning",
      title: "آیا مطمعن هستید؟",
      text: "آیا میخواهید سال مالی را حذف کنید؟",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText: "بله",
    }).then((res) => {
      if (res.isConfirmed) {
        (async () => {
          try {
            const response = await fetch(deletestock(stockID), {
              method: "DELETE",
              headers: {
                accept: "*/*",
              },
            });
            const data = await response.text();
            console.log(response);
            console.log(stockID);
            Swal.fire({
              title: "سال مالی مورد نظر با موفقیت حذف شد",
              text: "شما سال مالی مورد نظر را با موفقیت حذف کردید.",
              icon: "success",
            });
          } catch (e) {
            console.log(e);
          }
        })();
      }
    });
  };

  const resetFormData = () => {
    form.setValues({
      stockName: mainstock.stockName || "",
      year: mainstock.year || "",
      startingDate: mainstock.startingDate || "",
      finishDate: mainstock.finishDate || "",
      isStarted: mainstock.isStarted ? 1 : 0,
    });
  };

  return (
    <div>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title">
            لیست انبار ها
            <Button color="primary" variant="contained" startIcon={<IoMdAdd />} className="table-actions__btn me-3">
              <Link to={"/dashboard/addstock"} style={{ color: "inherit", textDecoration: "none" }}>
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
                <th>نام</th>
                <th>نام کاربری مالک انبار</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {stock.length ? (
                stock.map((stockItem, index) => (
                  <tr key={stockItem.id}>
                    <td>{index + 1}</td>
                    <td>{stockItem.stockName}</td>
                    <td>{stockItem.stockOwnerUserName}</td>
                    <td>
                      <div className="table-actions d-flex align-items-center">
                        <Button onClick={() => showHandler(stockItem.id)} color="secondary" variant="contained" startIcon={<FaEye />} className="table-actions__btn">
                          نمایش
                        </Button>
                        <Button onClick={() => editHandler(stockItem.id)} color="success" variant="contained" startIcon={<FaPencil />} className="table-actions__btn">
                          ویرایش
                        </Button>
                        <Button onClick={() => deleteHandler(stockItem.id)} color="error" variant="contained" startIcon={<MdDelete />} className="table-actions__btn">
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
              <h3 className="modal-title">جزئیات انبار {mainstock.stockName}</h3>
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <td>نام انبار</td>
                    <td>{mainstock.stockName}</td>
                  </tr>
                  <tr>
                    <td>نام کاربری مالک انبار </td>
                    <td>{mainstock.stockOwnerUserName}</td>
                  </tr>
                  <tr>
                    <td>کالاها</td>
                    <td>{mainstock.goods}</td>
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
              <h3 className="modal-title">ویرایش سال مالی</h3>
              <form onSubmit={form.handleSubmit} dir="rtl">
                <div className="row align-items-center">
                  <div className="col-12 col-md-6 mb-3">
                    <TextField
                      type="text"
                      label="نام سال مالی"
                      name="stockName"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.stockName}
                      error={form.touched.stockName && Boolean(form.errors.stockName)}
                      helperText={form.touched.stockName && form.errors.stockName}
                      className="input"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <TextField
                      type="number"
                      label="سال"
                      name="year"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.year}
                      error={form.touched.year && Boolean(form.errors.year)}
                      helperText={form.touched.year && form.errors.year}
                      className="input"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <TextField
                      type="text"
                      label="تاریخ شروع"
                      name="startingDate"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.startingDate}
                      error={form.touched.startingDate && Boolean(form.errors.startingDate)}
                      helperText={form.touched.startingDate && form.errors.startingDate}
                      className="input"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <TextField
                      type="text"
                      label="تاریخ پایان"
                      name="finishDate"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.finishDate}
                      error={form.touched.finishDate && Boolean(form.errors.finishDate)}
                      helperText={form.touched.finishDate && form.errors.finishDate}
                      className="input"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <FormControl className="input" fullWidth error={form.touched.isStarted && Boolean(form.errors.isStarted)}>
                      <InputLabel id="demo-simple-select-label">شروع شده؟</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={form.values.isStarted}
                        name="isStarted"
                        label="شروع شده؟"
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      >
                        <MenuItem value={1}>بله</MenuItem>
                        <MenuItem value={0}>خیر</MenuItem>
                      </Select>
                      {form.touched.isStarted && form.errors.isStarted && <FormHelperText>{form.errors.isStarted}</FormHelperText>}
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-12 text-center my-3">
                    <Button className="ms-1" variant="contained" color="success" type="submit">
                      بروزرسانی
                    </Button>
                    <Button onClick={resetFormData} variant="contained" color="error" type="button">
                      بازنشانی
                    </Button>
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
