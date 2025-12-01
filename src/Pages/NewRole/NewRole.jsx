import React, { useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import api from "../../Services/config";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi2";
import "./NewRole.css";

export default function NewRole() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      (async () => {
        try {
          setLoading(true);
          const { name } = values;
          const response = await api({
            method: "POST",
            url: "/api/Account/addrole",
            data: JSON.stringify(name),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              icon: "success",
              title: "عملیات با موفقیت انجام شد",
              text: "سمت با موفقیت ثبت شد",
            }).then(() => {
              navigate("/dashboard/roles");
            });
            form.resetForm();
          }
        } catch (e) {
          if (e.response?.status === 400) {
            Swal.fire({
              icon: "error",
              title: "خطا در انجام عملیات",
              text: e.response?.data?.message || "خطا در ثبت سمت",
            });
          } else if (e.response?.status === 415) {
            Swal.fire({
              icon: "error",
              title: "خطا در فرمت درخواست",
              text: "خطا در ارسال داده به سرور",
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
      name: Yup.string().required("نام سمت الزامی است").min(2, "نام سمت باید حداقل 2 کاراکتر باشد"),
    }),
  });

  return (
    <>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title mb-3">
            ثبت سمت جدید
            <Button color="primary" variant="contained" startIcon={<HiOutlineBookOpen />} className="table-actions__btn me-3">
              <Link to={"/dashboard/roles"} style={{ color: "inherit", textDecoration: "none" }}>
                سمت‌ها
              </Link>
            </Button>
          </h4>
        </div>

        <form onSubmit={form.handleSubmit} dir="rtl">
          <div className="row align-items-center">
            <div className="col-12 col-md-4 mb-3">
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
              <Button onClick={() => navigate("/dashboard/roles")} variant="contained" color="error" type="button" disabled={loading}>
                بازگشت
              </Button>
              <div>{loading && <span className="loader"></span>}</div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

