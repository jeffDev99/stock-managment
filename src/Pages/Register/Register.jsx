// this page use for user Regestration - DISABLED PAGE
// libraries
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import api from "../../Services/config";
// custom Componnets
import CustomInput from "../../Components/CustomInput/CustomInput";
// icons
import { CiUser } from "react-icons/ci";
import { TbCircleKey } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
// styles
import styles from "./Register.module.css";

export default function Register() {
  const { registerWrapper } = styles;
  const initialValues = { firstName: "", lastName: "", userName: "", password: "", email: "" };
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("نام الزامی است"),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
    userName: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد").required("رمز عبور الزامی است"),
    email: Yup.string().required("ایمیل الزامی است").email("لطفا یک ایمیل معتبر وارد کنید"),
  });

  return (
    <div className={registerWrapper}>
      <h3>ثبت نام </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const newUserObj = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            password: values.password,
            email: values.email,
          };
          (async () => {
            try {
              setLoading(true);
              const res = await api.post("/api/Auth/register", newUserObj);
              if (res.status === 200) {
                Swal.fire({
                  title: "ثبت نام با موفقیت انجام شد",
                  text: "لطفا جهت هدایت به صفحه ورود روی دکمه زیر کلیک کنید",
                  confirmButtonText: "ورود",
                  icon: "success",
                }).then((res) => {
                  navigate("/login");
                });
              }
            } catch (error) {
              console.error(error);
              if (error.status === 401) {
                Swal.fire({
                  title: "نام کاربری تکرار است",
                  text: "نام کاربری تکرار است. لطفا نام کاربری دیگری وارد کنید",
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
            <CustomInput touched={touched} errors={errors} name="firstName" placeholder="نام خود را وارد کنید" icon={CiUser} />
            <CustomInput touched={touched} errors={errors} name="lastName" placeholder="نام خانوادگی خود را وارد کنید" icon={CiUser} />
            <CustomInput touched={touched} errors={errors} name="userName" placeholder="نام کاربری خود را وارد کنید" icon={CiUser} />
            <CustomInput type="password" touched={touched} errors={errors} name="password" placeholder="رمز خود را وارد کنید" icon={TbCircleKey} />
            <CustomInput type="email" touched={touched} errors={errors} name="email" placeholder="ایمیل خود را وارد کنید" icon={MdAlternateEmail} />
            <button type="submit" className={`form-btn ${isSubmiting ? "disableBtn" : ""}`} disabled={isSubmiting}>
              {isSubmiting ? "loading..." : "ورود"}
            </button>
            <p className="">
              حساب کاربری دارید؟<Link to={"/"}>وارد شوید</Link>
            </p>
            {loading && <div className="loader"></div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
