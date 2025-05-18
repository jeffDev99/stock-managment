// libraries
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Services/config.js";
// custom Componnets
import CustomInput from "../../Components/CustomInput/CustomInput";
// icons
import { CiUser } from "react-icons/ci";
import { TbCircleKey } from "react-icons/tb";
// styles
import styles from "./Login.module.css";

export default function Login() {
  const { loginWrapper } = styles;
  const initialValues = { userName: "", password: "" };
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const validationSchema = Yup.object({
    userName: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد").required("رمز عبور الزامی است"),
  });
  return (
    <div className={loginWrapper}>
      <h3>ورود </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const UserData = {
            userName: values.userName,
            password: values.password,
          };
          (async () => {
            try {
              setLoading(true);
              const res = await api.post("/api/account/login", UserData);
              if (res.status === 200) {
                Cookies.set("token", res?.data?.token, { expires: 7 });
                navigate("/dashboard");
              }
            } catch (error) {
              if (error.status === 401) {
                Swal.fire({
                  title: "نام کاربری یا رمز عبور اشتباه میباشد",
                  text: "نام کاربری یا رمز عبور اشتباه میباشد. لطفا ورودی های خود را چک کنید",
                  icon: "error",
                }).then((res) => {
                  resetForm();
                });
              } else {
                Swal.fire({
                  title: "در سرور مشکلی رخ داده است",
                  text: "لطفا با پشتیبان سیستم تماس بگیرید",
                  icon: "error",
                }).then((res) => {
                  resetForm();
                });
              }
            } finally {
              setLoading(false);
            }
          })();
        }}
      >
        {({ isSubmiting, touched, errors }) => (
          <Form>
            <CustomInput touched={touched} errors={errors} name="userName" placeholder="نام کاربری خود را وارد کنید" icon={CiUser} />
            <CustomInput type="password" touched={touched} errors={errors} name="password" placeholder="رمز خود را وارد کنید" icon={TbCircleKey} />
            <button type="submit" className={`form-btn ${isSubmiting ? "disableBtn" : ""}`} disabled={isSubmiting}>
              {isSubmiting ? "loading..." : "ورود"}
            </button>
            {loading && <div className="loader"></div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
