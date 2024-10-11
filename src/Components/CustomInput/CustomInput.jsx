import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import styles from "./CustomInput.module.css";
const { formGroup, inputWithIcon, icon, error, active, iconActive } = styles;

const CustomInput = ({ name, placeholder, icon: Icon, type = "text", touched, errors }) => {
  const [isActive, setIsActive] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleFocus = () => setIsActive(true);
  const handleBlur = (formikBlur) => {
    setIsActive(false);
    formikBlur();
  };
  return (
    <div className={formGroup}>
      <div className={`${inputWithIcon} ${isActive ? active : ""}`}>
        {Icon && <Icon className={`${icon} ${isActive ? iconActive : ""}`} />}
        <Field name={name}>
          {({ field, form }) => {
            return <input {...field} type={isShowPassword ? "text" : type} placeholder={placeholder} onFocus={handleFocus} onBlur={(e) => handleBlur(() => form.handleBlur(e))} />;
          }}
        </Field>
        {type === "password" ? isShowPassword===true ? <GoEyeClosed style={{fontSize:"1.5rem",color:"#aaa"}} onClick={() => setIsShowPassword(false)} /> :<GoEye style={{fontSize:"1.5rem",color:"#aaa"}} onClick={() => setIsShowPassword(true)} />  : ""}
      </div>
      {touched[name] && errors[name] && <div className={error}>{errors[name]}</div>}
      {/* <ErrorMessage name={name} component="div" className={error} /> */}
    </div>
  );
};

export default CustomInput;
