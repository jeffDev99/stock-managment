import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import api from "../../Services/config";
import { TextField, Button } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Link, useNavigate } from "react-router-dom";
import { GrDropbox } from "react-icons/gr";
// import "./AddProduct.css";

export default function AddShift() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      shiftName: "",
      startTime: "",
      endTime: "",
      currentLocation: "",
      description: "",
    },
    onSubmit: (values) => {
      (async () => {
        try {
          console.log(values);
          const response = await api.post("/api/Shift/createshift", {
            shiftName: values.shiftName,
            startTime: values.startTime,
            endTime: values.endTime,
          });
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "شیفت ثبت شد",
              text: "شما شیفت خود را با موفقیت ثبت کردید",
            });
            form.resetForm();
            navigate("/dashboard/shift");
          } else if (response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "خطا در ثبت شیفت",
              text: "لطفا ورودی ها خود را بررسی کنید",
            });
            form.resetForm();
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },
    validationSchema: Yup.object().shape({
      shiftName: Yup.string().min(5, "نام شیفت باید حداقل 5 کاراکتر باشد").max(100, "نام شیفت باید حداکثر 100 کاراکتر باشد").required("نام شیفت الزامی است"),
      startTime: Yup.string("این فیلد باید عدد باشد").required("ساعت شروع الزامی است"),
      endTime: Yup.string("این فیلد باید عدد باشد").required("ساعت پایان الزامی است"),
    }),
  });

  return (
    <>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title mb-3">
            ایجاد شیفت
            <Button color="primary" variant="contained" startIcon={<GrDropbox />} className="table-actions__btn me-3">
              <Link to={"/dashboard/shift"} style={{ color: "inherit", textDecoration: "none" }}>
                لیست شیفت ها
              </Link>
            </Button>
          </h4>
        </div>

        <form onSubmit={form.handleSubmit} dir="rtl">
          <div className="row align-items-center">
            <div className="col-12 mb-3">
              <TextField
                type="text"
                label="نام شیفت"
                name="shiftName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.shiftName}
                error={form.touched.shiftName && Boolean(form.errors.shiftName)}
                helperText={form.touched.shiftName && form.errors.shiftName}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
            <TimePicker 
              label="ساعت شروع"
               className="input"
              value={form.values.startTime ? dayjs(form.values.startTime, 'HH:mm') : null}
              onChange={(newValue) => {
                const formattedTime = newValue ? newValue.format('HH:mm') : '';
                form.setFieldValue('startTime', formattedTime);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={form.touched.startTime && Boolean(form.errors.startTime)}
                  helperText={form.touched.startTime && form.errors.startTime}
                  fullWidth
                />
              )}
            />
              {/* <TextField
                type="text"
                label="ساعت شروع"
                name="startTime"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.startTime}
                error={form.touched.startTime && Boolean(form.errors.startTime)}
                helperText={form.touched.startTime && form.errors.startTime}
                className="input"
              /> */}
            </div>
            <div className="col-12 col-md-6 mb-3">
            <TimePicker 
                label="ساعت پایان"
               className="input"
              value={form.values.endTime ? dayjs(form.values.endTime, 'HH:mm') : null}
              onChange={(newValue) => {
                const formattedTime = newValue ? newValue.format('HH:mm') : '';
                form.setFieldValue('endTime', formattedTime);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={form.touched.endTime && Boolean(form.errors.endTime)}
                  helperText={form.touched.endTime && form.errors.endTime}
                  fullWidth
                />
              )}
            />
            </div>
            <div className="col-12 col-md-12 text-center my-3">
              <Button className="ms-1" variant="contained" color="success" type="submit">
                ثبت
              </Button>
              <Button onClick={form.resetForm} variant="contained" color="error" type="button">
                بازنشانی
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
