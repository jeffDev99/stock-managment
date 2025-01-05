import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
// components
import { MyContext } from "../../Layout/Dashboard/Dashboard";
// icons
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { BsBoxes } from "react-icons/bs";
import { GrDropbox } from "react-icons/gr";
import { RiInboxArchiveLine } from "react-icons/ri";
import { MdMoreTime } from "react-icons/md";
import { RiTimelineView } from "react-icons/ri";
import { HiListBullet } from "react-icons/hi2"; 

// styles
import "./SideBar.css";

export default function SideBar() {
  const context = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubMenu, setIsToggleSubMenu] = useState(false);
  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubMenu(!isToggleSubMenu);
  };
  return (
    <aside className="sidebar">
      <ul className="sidebar-list list-unstyled">
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 1 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(1)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <BsBoxes />
            </span>
            انبار
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft></FaAngleLeft>
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 1 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <NavLink className="sidebar-list__link" to="stock" end>
                <HiListBullet /> لیست انبار ها
                </NavLink>
              </li>
              <li className="sidebar-submenu__item">
                <NavLink className="sidebar-list__link" to="addstock" end>
                  <RiInboxArchiveLine /> اضافه کردن انبار جدید
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 4 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(4)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
            <GrDropbox />
            </span>
            محصول
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft></FaAngleLeft>
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 4 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <NavLink className="sidebar-list__link" to="product/all" end>
                <HiListBullet /> لیست محصولات
                </NavLink>
              </li>
              <li className="sidebar-submenu__item">
                <NavLink className="sidebar-list__link" to="addproduct" end>
                  <RiInboxArchiveLine /> اضافه کردن محصول جدید
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 2 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(2)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <HiOutlineUser />
            </span>
            کاربران
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft></FaAngleLeft>
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 2 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <NavLink className="sidebar-list__link" to="users" end>
                  <HiOutlineUsers /> لیست کاربران
                </NavLink>
              </li>
              <li className="sidebar-submenu__item">
                <NavLink to={"newUser"} end className="sidebar-list__link">
                  <HiOutlineUserPlus /> ثبت نام کاربر جدید
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 3 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(3)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <IoTimeOutline />
            </span>
            شیفت
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft></FaAngleLeft>
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 3 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <NavLink className="sidebar-list__link" to="shift" end>
                  <RiTimelineView /> لیست شیفت ها
                </NavLink>
              </li>
              <li className="sidebar-submenu__item">
                <NavLink className="sidebar-list__link" to="addshift" end>
                  <MdMoreTime /> اضافه کردن شیفت جدید
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
      <div className="sidebar-logout-wrapper">
        <div className="sidebar-logout">
          <Button variant="contained">
            <IoMdLogOut></IoMdLogOut>
            خروج
          </Button>
        </div>
      </div>
    </aside>
  );
}
