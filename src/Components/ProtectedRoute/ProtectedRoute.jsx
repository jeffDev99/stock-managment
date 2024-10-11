import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({children}) {
    let token = Cookies.get("token")
    if(!token){
        return <Navigate to={"/"}/>
    }
  return children;
}
