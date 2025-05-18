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
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrDropbox } from "react-icons/gr";
// import "./EditStock.css";

export default function AddStock() {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [initialValues, setInitialValues] = useState({
    goodName: "",
    goodNO: "",
    serialNO: "",
    currentLocation: "",
    description: "",
    stockId: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await api.get(`/api/Stock/getgoodbyid/${id}`);
        console.log(res)
        setInitialValues({
          goodName: res.data.goodName || "",
          goodNO: res.data.goodNO || "",
          serialNO: res.data.serialNO || "",
          currentLocation: res.data.currentLocation || "",
          description: res.data.description || "",
          stockId: res.data.stockId || "",
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [id]);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/api/Stock/get-stocks`);
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
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      (async () => {
        try {
          const response = await api.put(`/api/Stock/editgood/${id}`, {
            goodName: values.goodName,
            goodNO: values.goodNO,
            serialNO: values.serialNO,
            currentLocation: values.currentLocation,
            description: values.description,
            stockId: values.stockId,
          });
          console.log(response);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "محصول با موفقیت ویرایش  شد",
              text: "اطلاعات محصول شما با موفقیت ویرایش شد",
            }).then((res) => navigate("/dashboard/product"));
          } else if (response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "خطا در ثبت محصول",
              text: "لطفا ورودی ها خود را بررسی کنید",
            });
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },
    validationSchema: Yup.object().shape({
      goodName: "",
      goodNO: "",
      serialNO: "",
      currentLocation: "",
      description: "",
      stockId: stocks.length > 0 ? stocks[0].userName : "",
    }),
  });

  return (
    <>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title mb-3">
            ویرایش محصول
            <Button color="primary" variant="contained" startIcon={<GrDropbox />} className="table-actions__btn me-3">
              <Link to={"/dashboard/stock"} style={{ color: "inherit", textDecoration: "none" }}>
                لیست محصولها
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
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={form.values.stockId} name="stockId" label="شروع شده؟" onChange={form.handleChange} onBlur={form.handleBlur}>
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
              <Button onClick={() => navigate("/dashboard/product")} variant="text" color="error" type="button">
                بازگشت
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
