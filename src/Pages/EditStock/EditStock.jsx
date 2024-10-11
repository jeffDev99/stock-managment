import React, { useState } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import * as Yup from "yup";
import api from "../../Services/config";
import { TextField, Button, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
// import { createFiscalYear } from "../../Services/FiscalYear/FiscalYear";
import { Link, useParams } from "react-router-dom";
import { GrDropbox } from "react-icons/gr";
import "./EditStock.css";

export default function EditStock() {
  const [loading, setLoading] = useState(true);
  const [mainstock, setMainstock] = useState([]);
  const { id } = useParams();
  (async () => {
    try {
      const res = await api.get(`/api/Stock/getstockbyid/${id}`);
      setMainstock(res.data)
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
  
  const form = useFormik({
    initialValues: {
      fiscalYearName: "",
      year: "",
      startingDate: "",
      finishDate: "",
      isClosed: true,
      isStarted: 0,
    },
    onSubmit: (values) => {
      (async () => {
        try {
          const valueWithId = { ...values, fiscalYearID: uuidv4() };

          const response = await fetch(createFiscalYear(), {
            method: "POST",
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(valueWithId),
          });
          const data = await response.text();
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "سال مالی ثبت شد",
              text: "شما سال مالی خود را با موفقیت ثبت کردید",
            });
            resetFormData();
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
      fiscalYearName: Yup.string().min(5, "سال مالی باید حداقل 5 کاراکتر باشد").max(100, "سال مالی باید حداکثر 100 کاراکتر باشد").required("سال مالی الزامی است"),
      year: Yup.number().required("سال الزامی است"),
      startingDate: Yup.string().required("تاریخ شروع سال مالی الزامی است"),
      finishDate: Yup.string().required("تاریخ پایان سال مالی الزامی است"),
      isStarted: Yup.number().required("این فیلد الزامی است"),
    }),
  });

  const resetFormData = () => {
    form.setValues({
      fiscalYearName: "",
      year: "",
      startingDate: "",
      finishDate: "",
      isClosed: true,
      isStarted: 0,
    });
  };

  return (
    <>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title mb-3">
            ویرایش انبار
            <Button color="primary" variant="contained" startIcon={<GrDropbox />} className="table-actions__btn me-3">
              <Link to={"/fiscalyearlist"} style={{ color: "inherit", textDecoration: "none" }}>
                لیست انبارها
              </Link>
            </Button>
          </h4>
        </div>

        <form onSubmit={form.handleSubmit} dir="rtl">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="نام سال مالی"
                name="fiscalYearName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.fiscalYearName}
                error={form.touched.fiscalYearName && Boolean(form.errors.fiscalYearName)}
                helperText={form.touched.fiscalYearName && form.errors.fiscalYearName}
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
                ثبت
              </Button>
              <Button onClick={resetFormData} variant="contained" color="error" type="button">
                بازنشانی
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
