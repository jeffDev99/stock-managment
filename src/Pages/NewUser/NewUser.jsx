import React, { useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { TextField, Button, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import api from "../../Services/config";
import { Link } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi2";
import "./NewUser.css";

export default function NewUser() {
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      (async () => {
        try {
          setLoading(true);
          const { firstName, lastName, userName, password, email } = values;
          const response = await api.post("api/Auth/register", {
            firstName,
            lastName,
            userName,
            password,
            email,
          });
          console.log(response);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "عملیات با موفقیت انجام شد",
              text: "کاربر با موفقیت ثبت شد",
            });
            form.resetForm();
          }
        } catch (e) {
          if (e.status === 400) {
            Swal.fire({
              icon: "error",
              title: "خطا در انجام عملیات",
              text: "نام کاربری تکراری است",
            });
            form.resetForm();
          }
        } finally {
          setLoading(false);
        }
      })();
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().max(100, " نام باید حداکثر 100 کاراکتر باشد").required("نام  الزامی است"),
      lastName: Yup.string().required("نام خانوادگی الزامی است"),
      userName: Yup.string().required("نام کاربری الزامی است"),
      password: Yup.string().required("رمز الزامی است"),
      email: Yup.string().email().required("ایمیل الزامی است"),
    }),
  });

  const resetFormData = () => {
    form.setValues({
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
    });
  };

  return (
    <>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title mb-3">
            ثبت نام کاربر جدید
            <Button color="primary" variant="contained" startIcon={<HiOutlineBookOpen />} className="table-actions__btn me-3">
              <Link to={"/dashboard/users"} style={{ color: "inherit", textDecoration: "none" }}>
                کاربران
              </Link>
            </Button>
          </h4>
        </div>

        <form onSubmit={form.handleSubmit} dir="rtl">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="نام"
                name="firstName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.firstName}
                error={form.touched.firstName && Boolean(form.errors.firstName)}
                helperText={form.touched.firstName && form.errors.firstName}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="نام خانوادگی"
                name="lastName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.lastName}
                error={form.touched.lastName && Boolean(form.errors.lastName)}
                helperText={form.touched.lastName && form.errors.lastName}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="نام کاربری"
                name="userName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.userName}
                error={form.touched.userName && Boolean(form.errors.userName)}
                helperText={form.touched.userName && form.errors.userName}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="رمز"
                name="password"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.password}
                error={form.touched.password && Boolean(form.errors.password)}
                helperText={form.touched.password && form.errors.password}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="ایمیل"
                name="email"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.email}
                error={form.touched.email && Boolean(form.errors.email)}
                helperText={form.touched.email && form.errors.email}
                className="input"
              />
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
  );
}
