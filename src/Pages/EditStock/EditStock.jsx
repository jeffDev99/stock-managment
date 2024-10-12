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
import "./EditStock.css";

export default function AddStock() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    stockName: "",
    stockOwnerUserName: "",
  });
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await api.get(`/api/Stock/getstockbyid/${id}`);
        setInitialValues({
          stockName: res.data.stockName || "",
          stockOwnerUserName: res.data.stockOwnerUserName || "",
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
        const res = await api.get(`/api/Auth/getusers`);
        setUsers(res.data);
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
    enableReinitialize:true,
    onSubmit: (values) => {
      (async () => {
        try {
          const response = await api.put(`api/Stock/editstock/${id}`, {
            stockName: values.stockName,
            stockOwnerUserName: values.stockOwnerUserName,
          });
          console.log(response)
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "انبار با موفقیت ویرایش  شد",
              text: "اطلاعات انبار شما با موفقیت ویرایش شد",
            }).then(res=>navigate("/dashboard/stock"));
          } else if (response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "خطا در ثبت انبار",
              text: "لطفا ورودی ها خود را بررسی کنید",
            });
          }
        } catch (e) {
          console.log(e);
        }
      })();
    },
    validationSchema: Yup.object().shape({
      stockName: Yup.string().min(5, "نام انبار باید حداقل 5 کاراکتر باشد").max(100, "نام انبار باید حداکثر 100 کاراکتر باشد").required("نام انبار الزامی است"),
      stockOwnerUserName: Yup.string().required("این فیلد الزامی است"),
    }),
  });

  return (
    <>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title mb-3">
            ویرایش انبار
            <Button color="primary" variant="contained" startIcon={<GrDropbox />} className="table-actions__btn me-3">
              <Link to={"/dashboard/stock"} style={{ color: "inherit", textDecoration: "none" }}>
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
                label="نام انبار"
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
              <FormControl className="input" fullWidth error={form.touched.stockOwnerUserName && Boolean(form.errors.stockOwnerUserName)}>
                <InputLabel id="demo-simple-select-label">نام کاربری مالک انبار </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.values.stockOwnerUserName}
                  name="stockOwnerUserName"
                  label="شروع شده؟"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                >
                  {users.length === 0 ? (
                    <MenuItem disabled>کاربری موجود نیست</MenuItem>
                  ) : (
                    users.map((item) => (
                      <MenuItem value={item.userName} key={item.id}>
                        {item.userName}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {form.touched.stockOwnerUserName && form.errors.stockOwnerUserName && <FormHelperText>{form.errors.stockOwnerUserName}</FormHelperText>}
              </FormControl>
            </div>
            <div className="col-12 col-md-12 text-center my-3">
              <Button className="ms-1" variant="contained" color="success" type="submit">
                ثبت
              </Button>
              <Button onClick={()=>navigate("/dashboard/stock")} variant="text" color="error" type="button">
                بازگشت
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
