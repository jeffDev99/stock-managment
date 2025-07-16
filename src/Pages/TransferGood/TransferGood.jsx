import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import api from "../../Services/config";
import MultiSelectbox from "../../Components/MultiSelectbox/MultiSelectbox";
import { CircularProgress, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@mui/material";
import { generateDocxReport } from "../../Helpers/reportGenerator";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TransferGood() {
  // State های مربوط به داده‌های اولیه فرم
  const [allGoods, setAllGoods] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goodsRes, usersRes] = await Promise.all([
          api.get(`/api/Stock/get-all-goods`),
          api.get(`/api/Account/GetAllUsers`), // فرض بر اینکه این API کاربران را برمی‌گرداند
        ]);
        setAllGoods(goodsRes.data || []);
        setUsers(usersRes.data || []);
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "خطا در دریافت اطلاعات",
          text: "مشکلی در دریافت لیست کالاها یا کاربران پیش آمده است.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      goodIds: [],
      userId: null, 
    },

    validationSchema: Yup.object({
      goodIds: Yup.array().min(1, "حداقل یک کالا باید انتخاب شود").required("انتخاب کالا الزامی است"),
      userId: Yup.object().nullable().required("انتخاب کاربر الزامی است"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          goodIds: values.goodIds.map(good => good.id), 
          toUserId: values.userId.id, 
        };
        const response = await api.post("/api/GoodTransaction/transfer-goods", payload);
        console.log(response.data);
        generateDocxReport(response.data);
        formik.resetForm();

        Swal.fire({
          icon: "success",
          title: "انتقال با موفقیت انجام شد",
        }).then(() => {
          navigate(`/dashboard/UploadSignedDocument/${response.data.transferId}`);
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "خطا در ثبت انتقال",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <CircularProgress />
      </div>
    );
  }
  console.log(allGoods)
  return (
    <div className="card shadow border-0 p-3">
      <h4 className="card__title">تخصیص محصول به کاربر</h4>

      <form onSubmit={formik.handleSubmit}>
        <div className="row align-items-centre mt-4">
          <div className="col-12 col-md-6 mb-3">
            <FormControl className="input" fullWidth error={formik.touched.goodIds && Boolean(formik.errors.goodIds)}>
              <Autocomplete
                multiple
                disablePortal
                options={allGoods}
                getOptionLabel={(option) => option.goodName || ""}
                value={formik.values.goodIds}
                onChange={(event, newValue) => {
                  formik.setFieldValue("goodIds", newValue);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="کالاها را انتخاب کنید" />}
              />
              <FormHelperText>{formik.touched.goodIds && formik.errors.goodIds}</FormHelperText>
            </FormControl>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <FormControl className="input" fullWidth error={formik.touched.userId && Boolean(formik.errors.userId)}>
              <Autocomplete
                disablePortal
                options={users}
                getOptionLabel={(option) => option.userName || ""}
                value={formik.values.userId}
                onChange={(event, newValue) => {
                  formik.setFieldValue("userId", newValue);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="کاربر تحویل‌گیرنده" />}
              />
              <FormHelperText>{formik.touched.userId && formik.errors.userId}</FormHelperText>
            </FormControl>
          </div>
        </div>

        <div className="mt-4">
          <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "در حال ثبت..." : "ثبت انتقال"}
          </Button>
        </div>
      </form>
    </div>
  );
}

