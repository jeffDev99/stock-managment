import React from "react";
import "./DashboardBox.css";
import { Button } from "@mui/material";

function DashboardBox({ bgColor, icon, title,subTitle }) {
  return (
    <Button
      className="dashboardBox"
      style={{
        backgroundImage: `linear-gradient(to right, ${bgColor?.[0]}, ${bgColor?.[1]})`,
      }}
    >
      <div className="d-flex w-100">
        <div className="col1">
          <h4 className="text-white mb-0 ">{subTitle && subTitle}</h4>
          <span className="text-white">{title && title}</span>
        </div>
        <div className="me-auto">{icon && <span className="icon">{icon}</span>}</div>
      </div>
    </Button>
  );
}

export default DashboardBox;
