import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { TextField, Button, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import api from "../../Services/config";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi2";
import "./NewUser.css";

export default function NewUser() {
  const [loading, setLoading] = useState(false);
  const [rols, setRols] = useState([]);
  const navigate = useNavigate();

  // get rols
  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      phone: "",
      role: rols.length > 0 ? rols[0].name : "",
    },
    onSubmit: (values) => {
      (async () => {
        try {
          setLoading(true);
          const { phone, firstName, lastName, nationalCode, role } = values;
          const response = await api.post("/api/Account/register", {
            firstName,
            lastName,
            nationalCode,
            phone,
            role,
          });
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
              text: e.response?.data?.message || "خطا در ثبت کاربر",
            });
            form.resetForm();
          }
        } finally {
          setLoading(false);
        }
      })();
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("نام الزامی است"),
      lastName: Yup.string().required("نام خانوادگی الزامی است"),
      nationalCode: Yup.string().required("کد ملی الزامی است").length(10, "کد ملی باید 10 رقم باشد"),
      phone: Yup.string().required("شماره موبایل الزامی است"),
      role: Yup.string().required("این فیلد الزامی است"),
    }),
  });

  const resetFormData = () => {
    form.setValues({
      firstName: "",
      lastName: "",
      nationalCode: "",
      phone: "",
      role: rols.length > 0 ? rols[0].name : "",
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
            <div className="col-12 col-md-4 mb-3">
              <TextField type="text" label="نام" name="firstName" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.firstName} error={form.touched.firstName && Boolean(form.errors.firstName)} helperText={form.touched.firstName && form.errors.firstName} className="input" />
            </div>
            <div className="col-12 col-md-4 mb-3">
              <TextField type="text" label="نام خانوادگی" name="lastName" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.lastName} error={form.touched.lastName && Boolean(form.errors.lastName)} helperText={form.touched.lastName && form.errors.lastName} className="input" />
            </div>
            <div className="col-12 col-md-4 mb-3">
              <TextField type="text" label="کد ملی" name="nationalCode" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.nationalCode} error={form.touched.nationalCode && Boolean(form.errors.nationalCode)} helperText={form.touched.nationalCode && form.errors.nationalCode} className="input" />
            </div>
            <div className="col-12 col-md-4 mb-3">
              <TextField type="text" label="شماره موبایل" name="phone" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.phone} error={form.touched.phone && Boolean(form.errors.phone)} helperText={form.touched.phone && form.errors.phone} className="input" />
            </div>
            <div className="col-12 col-md-4 mb-3">
              <FormControl className="input" fullWidth error={form.touched.role && Boolean(form.errors.role)}>
                <InputLabel id="demo-simple-select-label">سمت</InputLabel>
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
              <Button onClick={() => navigate("/dashboard/users")} variant="contained" color="error" type="button">
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
