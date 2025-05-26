import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";
// components
import { MyContext } from "../../Layout/Dashboard/Dashboard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// icons
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoTimeOutline } from "react-icons/io5";
import { BsBoxes } from "react-icons/bs";
import { GrDropbox, GrUserSettings } from "react-icons/gr";
import { RiFileList3Line, RiHomeOfficeLine, RiInboxArchiveLine } from "react-icons/ri";
import { MdMoreTime } from "react-icons/md";
import { RiTimelineView } from "react-icons/ri";
import { HiListBullet } from "react-icons/hi2";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { BsCameraReels } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

// styles
import "./SideBar.css";
import { TbBuildingEstate } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { BiUser } from "react-icons/bi";

// ver 2
export default function SideBar() {
  const context = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubMenu, setIsToggleSubMenu] = useState(false);

  const [submenuStates, setSubmenuStates] = useState({
    products: false,
    subMenu1: false,
    subMenu2: false,
  });

  const navigate = useNavigate();

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubMenu(!isToggleSubMenu);
  };

  const toggleSubmenu = (submenu) => {
    setSubmenuStates((prevState) => ({
      ...prevState,
      [submenu]: !prevState[submenu],
    }));
  };

  const handleCloseMyAcc = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <ul className="sidebar-list list-unstyled">
        <li className="sidebar-list__item">
          <NavLink className="sidebar-list__link" to="dashboard" end>
            <Button className={`sidebar-list__btn w-100`}>
              <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
                <AiOutlineDashboard />
              </span>
              داشبورد
            </Button>
          </NavLink>
        </li>

        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 4 && isToggleSubMenu ? "active" : ""}`} onClick={() => isOpenSubmenu(4)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <RiHomeOfficeLine />
            </span>
            اتوماسیون اداری
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft />
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 4 && isToggleSubMenu ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu2 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu2")}>
                  <div className="d-flex gap-1 align-items-center">
                    <RiFileList3Line  /> گزارشات
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu2 ? "sub-collapse" : "sub-collapsed"}`}>
                  <ul className="sidebar-submenu list-unstyled">
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="addstock" end>
                        گزارش روزانه
                      </NavLink>
                    </li>
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="stock" end>
                      گزارش محرمانه
                      </NavLink>
                    </li>
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="stock" end>
                      گزارش ماهیانه
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu1 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu1")}>
                  <div className="d-flex gap-1 align-items-center">
                    <GrDropbox /> محصولات
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu1 ? "sub-collapse" : "sub-collapsed"}`}>
                  <ul className="sidebar-submenu list-unstyled">
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="product/all" end>
                        لیست محصولات
                      </NavLink>
                    </li>
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="addproduct" end>
                        اضافه کردن محصول جدید
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 3 && isToggleSubMenu ? "active" : ""}`} onClick={() => isOpenSubmenu(3)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <HiOutlineUsers />
            </span>
            منابع انسانی
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft />
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 3 && isToggleSubMenu ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu2 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu2")}>
                  <div className="d-flex gap-1 align-items-center">
                    <IoTimeOutline /> شیفت
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu2 ? "sub-collapse" : "sub-collapsed"}`}>
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
          </div>
        </li>
        
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 6 && isToggleSubMenu ? "active" : ""}`} onClick={() => isOpenSubmenu(6)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <BsCameraReels />
            </span>
            فرهنگی
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft />
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 6 && isToggleSubMenu ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu2 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu2")}>
                  <div className="d-flex gap-1 align-items-center">
                    <AiOutlineUser /> کمیته خادمین
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu2 ? "sub-collapse" : "sub-collapsed"}`}>
                  <ul className="sidebar-submenu list-unstyled">
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="shift" end>
                        لیست خادمین
                      </NavLink>
                    </li>
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="addshift" end>
                        اضافه کرزدن خادم جدید
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 1 && isToggleSubMenu ? "active" : ""}`} onClick={() => isOpenSubmenu(1)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <TbBuildingEstate />
            </span>
            اموال و دارایی ها
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft />
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 1 && isToggleSubMenu ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              {/* <li className="sidebar-submenu__item">
                <NavLink className="sidebar-list__link" to="product/all" end>
                  <HiListBullet /> لیست محصولات
                </NavLink>
              </li> */}

              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu2 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu2")}>
                  <div className="d-flex gap-1 align-items-center">
                    <BsBoxes /> انبارها
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu2 ? "sub-collapse" : "sub-collapsed"}`}>
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
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu1 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu1")}>
                  <div className="d-flex gap-1 align-items-center">
                    <GrDropbox /> محصولات
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu1 ? "sub-collapse" : "sub-collapsed"}`}>
                  <ul className="sidebar-submenu list-unstyled">
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="product/all" end>
                        لیست محصولات
                      </NavLink>
                    </li>
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="addproduct" end>
                        اضافه کردن محصول جدید
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 2 && isToggleSubMenu ? "active" : ""}`} onClick={() => isOpenSubmenu(2)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <GiMoneyStack />
            </span>
            مالی
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft />
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 2 && isToggleSubMenu ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu2 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu2")}>
                  <div className="d-flex gap-1 align-items-center">
                    <BsBoxes /> ثبت فاکتور
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu2 ? "sub-collapse" : "sub-collapsed"}`}>
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
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu1 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu1")}>
                  <div className="d-flex gap-1 align-items-center">
                    <GrDropbox /> تهیه فاکتور
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu1 ? "sub-collapse" : "sub-collapsed"}`}>
                  <ul className="sidebar-submenu list-unstyled">
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="product/all" end>
                        لیست محصولات
                      </NavLink>
                    </li>
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="addproduct" end>
                        اضافه کردن محصول جدید
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        
        <li className="sidebar-list__item">
          <Button className={`sidebar-list__btn w-100 ${activeTab === 5 && isToggleSubMenu ? "active" : ""}`} onClick={() => isOpenSubmenu(5)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <RiAdminLine  />
            </span>
            مدیر سیستم
            <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
              <FaAngleLeft />
            </span>
          </Button>
          <div className={`sidebar-submenu-wrapper ${activeTab === 5 && isToggleSubMenu ? "sub-collapse" : "sub-collapsed"}`}>
            <ul className="sidebar-submenu list-unstyled">
            <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu1 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu1")}>
                  <div className="d-flex gap-1 align-items-center">
                    <HiOutlineUser />
                    کاربران
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu1 ? "sub-collapse" : "sub-collapsed"}`}>
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
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu2 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu2")}>
                  <div className="d-flex gap-1 align-items-center">
                    <GrProjects  />
                     پروژه ها
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu2 ? "sub-collapse" : "sub-collapsed"}`}>
                  <ul className="sidebar-submenu list-unstyled">
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="" end>
                      تعریف پروژه ها
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              
              <li className="sidebar-submenu__item">
                <Button className={`sidebar-list__btn w-100 ${submenuStates.subMenu3 ? "active" : ""}`} onClick={() => toggleSubmenu("subMenu3")}>
                  <div className="d-flex gap-1 align-items-center">
                    <GrUserSettings   />
                     نقش ها
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu3 ? "sub-collapse" : "sub-collapsed"}`}>
                  <ul className="sidebar-submenu list-unstyled">
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="" end>
                      تعریف نقش
                      </NavLink>
                    </li>
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="" end>
                      نقش ها
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
      <div className="sidebar-logout-wrapper">
        <div className="sidebar-logout">
          <Button variant="contained" onClick={handleCloseMyAcc} color="secondary">
            <IoMdLogOut />
            خروج
          </Button>
        </div>
      </div>
    </aside>
  );
}
