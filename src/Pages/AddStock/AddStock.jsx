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
import "./AddStock.css";

export default function AddStock() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  
  // get all user
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/api/Account/GetAllUsers`);
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
    initialValues: {
      stockName: "",
      stockOwnerId: users.length > 0 ? users[0].id : "",
    },
    onSubmit: (values) => {
      (async () => {
        try {
          const response = await api.post("/api/Stock/create-stock", {
            stockName: values.stockName,
            stockOwnerId: values.stockOwnerId,
          });
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "انبار ثبت شد",
              text: "شما انبار خود را با موفقیت ثبت کردید",
            });
            form.resetForm();
            navigate("/dashboard/stock")
          } else if (response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "خطا در ثبت انبار",
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
      stockName: Yup.string().min(5, "نام انبار باید حداقل 5 کاراکتر باشد").max(100, "نام انبار باید حداکثر 100 کاراکتر باشد").required("نام انبار الزامی است"),
      stockOwnerId: Yup.string().required("این فیلد الزامی است"),
    }),
  });

  const resetFormData = () => {
    form.setValues({
      stockName: "",
      stockOwnerId: users[0].userName,
    });
  };

  return (
    <>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title mb-3">
            ایجاد انبار
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
              <FormControl className="input" fullWidth error={form.touched.stockOwnerId && Boolean(form.errors.stockOwnerId)}>
                <InputLabel id="demo-simple-select-label">نام کاربری انباردار </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.values.stockOwnerId}
                  name="stockOwnerId"
                  label="شروع شده؟"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                >
                  {users.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.userName}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.stockOwnerId && form.errors.stockOwnerId && <FormHelperText>{form.errors.stockOwnerId}</FormHelperText>}
              </FormControl>
            </div>
            <div className="col-12 col-md-12 text-center my-3">
              <Button className="ms-1" variant="contained" color="success" type="submit">
                ثبت
              </Button>
              <Button onClick={() => navigate("/dashboard/stock")} variant="contained" color="error" type="button">
                بازگشت
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}


 