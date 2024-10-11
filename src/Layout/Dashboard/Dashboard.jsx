import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import TopBar from "../../Components/TopBar/TopBar";
// add rtl;
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import "./Dashboard.css";
const MyContext = createContext();

export default function Dashboard() {
  const [isToggleSideBar, setIsToggleSideBar] = useState(false);
  const [themeMode, setThemeMode] = useState(true);

  useEffect(() => {
    (()=>{
      if(window.innerWidth<=992){
        setIsToggleSideBar(true)
      }else{
        setIsToggleSideBar(false)
      }
    })()
  }, []);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setThemeMode(false);
    } else {
      setThemeMode(true);
    }
  }, []);

  // Update theme in localStorage and body class on theme change
  useEffect(() => {
    if (themeMode) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [themeMode]);

  const values = {
    isToggleSideBar,
    setIsToggleSideBar,
    themeMode,
    setThemeMode,
  };

  return (
    <MyContext.Provider value={values}>
      <TopBar />
      <div className="main d-flex">
        <div className={`sidebar-wrapper ${isToggleSideBar ? "toggle" : ""}`}>
          <SideBar />
        </div>
        {!isToggleSideBar && (
        <div className="backdrop" onClick={() => setIsToggleSideBar(true)}></div>
      )}
        <main className={`content ${isToggleSideBar ? "toggle" : ""}`}>
          <Outlet />
        </main>
      </div>
    </MyContext.Provider>
  );
}

export { MyContext };
