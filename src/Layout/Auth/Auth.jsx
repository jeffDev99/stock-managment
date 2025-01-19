import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../../public/images/logoLogin.png"
import "./Auth.css";

export default function Auth() {
  return (
    <div className="authWrapper">
      <div className="authBox">
        <figure>
          <img src={Logo} className="authLogo" alt="" />
        </figure>
        <div className="form-wrapper"><Outlet/></div>
      </div>
    </div>
  );
}
