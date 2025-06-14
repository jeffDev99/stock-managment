import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import api from "../../Services/config";
import MultiSelectbox from "../../Components/MultiSelectbox/MultiSelectbox";
import { CircularProgress, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@mui/material";
import { generateDocxReport } from "../../Helpers/reportGenerator";
import { useNavigate } from "react-router-dom";

export default function TransferGood() {
  // State های مربوط به داده‌های اولیه فرم
  const [allGoods, setAllGoods] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // دریافت اطلاعات اولیه (کالاها و کاربران)
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

  // راه‌اندازی Formik
  const formik = useFormik({
    // مقادیر اولیه فرم
    initialValues: {
      goodIds: [], // برای MultiSelectbox
      userId: "", // برای Selectbox کاربر
    },

    // اعتبارسنجی با Yup
    validationSchema: Yup.object({
      goodIds: Yup.array().min(1, "حداقل یک کالا باید انتخاب شود").required("انتخاب کالا الزامی است"),
      userId: Yup.string().required("انتخاب کاربر الزامی است"),
    }),

    // منطق ثبت فرم
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // فرض بر اینکه API شما به این شکل داده‌ها را دریافت می‌کند
        const payload = {
          goodIds: values.goodIds,
          toUserId: values.userId,
        };
        const response = await api.post("/api/GoodTransaction/transfer-goods", payload);
        console.log(response.data); 
        generateDocxReport(response.data);

        Swal.fire({
          icon: "success",
          title: "انتقال با موفقیت انجام شد",
        });
        formik.resetForm();
        // navigate("/some-success-page");
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

  return (
    <div className="card shadow border-0 p-3">
      <h4 className="card__title">تخصیص محصول به کاربر</h4>

      <form onSubmit={formik.handleSubmit}>
        <div className="row align-items-centre mt-4">
          <div className="col-12 col-md-6 mb-3">
            <FormControl className="input" fullWidth error={formik.touched.goodIds && Boolean(formik.errors.goodIds)}>
              <MultiSelectbox label="کالاها را انتخاب کنید" options={allGoods} selected={formik.values.goodIds} onChange={(ids) => formik.setFieldValue("goodIds", ids)} />
              <FormHelperText>{formik.touched.goodIds && formik.errors.goodIds}</FormHelperText>
            </FormControl>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <FormControl className="input" fullWidth error={formik.touched.userId && Boolean(formik.errors.userId)}>
              <InputLabel id="user-select-label">کاربر تحویل‌گیرنده</InputLabel>
              <Select labelId="user-select-label" name="userId" label="کاربر تحویل‌گیرنده" value={formik.values.userId} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.userName}
                  </MenuItem>
                ))}
              </Select>
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

