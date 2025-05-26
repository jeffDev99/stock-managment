import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import api from "../../Services/config";
import { TextField, Button, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
// import { createFiscalYear } from "../../Services/FiscalYear/FiscalYear";
import { Link, useNavigate } from "react-router-dom";
import { GrDropbox } from "react-icons/gr";
// import "./AddProduct.css";

export default function AddProduct() {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/api/Stock/get-all-stocks`);
        setStocks(res.data);
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
      goodName: "",
      goodNO: "",
      serialNO: "",
      currentLocation: "",
      description: "",
      stockId: stocks.length > 0 ? stocks[0].userName : "",
    },
    onSubmit: (values) => {
      (async () => {
        try {
          const response = await api.post("/api/Stock/create-good", {
            goodName: values.goodName,
            goodNO: values.goodNO,
            serialNO: values.serialNO,
            currentLocation: values.currentLocation,
            description: values.description,
            stockId: values.stockId,
          });
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "محصول ثبت شد",
              text: "شما محصول خود را با موفقیت ثبت کردید",
            });
            form.resetForm();
            navigate("/dashboard/product/all");
          } else if (response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "خطا در ثبت محصول",
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
      goodName: Yup.string().min(5, "نام محصول باید حداقل 5 کاراکتر باشد").max(100, "نام محصول باید حداکثر 100 کاراکتر باشد").required("نام محصول الزامی است"),
      goodNO: Yup.string("این فیلد باید عدد باشد").required("شماره محصول الزامی است"),
      serialNO: Yup.string("این فیلد باید عدد باشد").required("سریال محصول الزامی است"),
      currentLocation: Yup.string().required("این فیلد الزامی است"),
      description: Yup.string().required("این فیلد الزامی است"),
      stockId: Yup.number().required("این فیلد الزامی است"),
    }),
  });

  return (
    <>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title mb-3">
            ایجاد محصول
            <Button color="primary" variant="contained" startIcon={<GrDropbox />} className="table-actions__btn me-3">
              <Link to={"/dashboard/product"} style={{ color: "inherit", textDecoration: "none" }}>
                لیست محصولات
              </Link>
            </Button>
          </h4>
        </div>

        <form onSubmit={form.handleSubmit} dir="rtl">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="نام محصول"
                name="goodName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.goodName}
                error={form.touched.goodName && Boolean(form.errors.goodName)}
                helperText={form.touched.goodName && form.errors.goodName}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="شماره محصول"
                name="goodNO"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.goodNO}
                error={form.touched.goodNO && Boolean(form.errors.goodNO)}
                helperText={form.touched.goodNO && form.errors.goodNO}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="سریال محصول"
                name="serialNO"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.serialNO}
                error={form.touched.serialNO && Boolean(form.errors.serialNO)}
                helperText={form.touched.serialNO && form.errors.serialNO}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <TextField
                type="text"
                label="محل فعلی محصول"
                name="currentLocation"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.currentLocation}
                error={form.touched.currentLocation && Boolean(form.errors.currentLocation)}
                helperText={form.touched.currentLocation && form.errors.currentLocation}
                className="input"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <FormControl className="input" fullWidth error={form.touched.stockId && Boolean(form.errors.stockId)}>
                <InputLabel id="demo-simple-select-label">انبار</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.values.stockId}
                  name="stockId"
                  label="شروع شده؟"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                >
                  {stocks.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.stockName}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.stockId && form.errors.stockId && <FormHelperText>{form.errors.stockId}</FormHelperText>}
              </FormControl>
            </div>
            <div className="col-12 col-md-6  mb-3">
              <TextField
                type="text"
                label="توضیحات"
                name="description"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.description}
                error={form.touched.description && Boolean(form.errors.description)}
                helperText={form.touched.description && form.errors.description}
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
