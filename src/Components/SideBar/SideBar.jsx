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
import { GrDropbox } from "react-icons/gr";
import { RiHomeOfficeLine, RiInboxArchiveLine } from "react-icons/ri";
import { MdMoreTime } from "react-icons/md";
import { RiTimelineView } from "react-icons/ri";
import { HiListBullet } from "react-icons/hi2";
import { AiOutlineDashboard } from "react-icons/ai";

// styles
import "./SideBar.css";
import { TbBuildingEstate } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";

// ver 0
// export default function SideBar() {
//   const context = useContext(MyContext);
//   const [activeTab, setActiveTab] = useState(0);
//   const [isToggleSubMenu, setIsToggleSubMenu] = useState(false);
//       const navigate = useNavigate();

//   const isOpenSubmenu = (index) => {
//     setActiveTab(index);
//     setIsToggleSubMenu(!isToggleSubMenu);
//   };
//     const handleCloseMyAcc = () => {
//     Cookies.remove("token");
//     navigate("/");
//   };
//   return (
//     <aside className="sidebar">
//       <ul className="sidebar-list list-unstyled">
//         <li className="sidebar-list__item">
//           <NavLink className="sidebar-list__link" to="dashboard" end>
//             <Button className={`sidebar-list__btn w-100`}>
//               <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
//                 <AiOutlineDashboard />
//               </span>
//               داشبورد
//             </Button>
//           </NavLink>
//         </li>
//         <li className="sidebar-list__item">
//           <Button className={`sidebar-list__btn w-100 ${activeTab === 1 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(1)}>
//             <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
//               <BsBoxes />
//             </span>
//             انبار
//             <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
//               <FaAngleLeft></FaAngleLeft>
//             </span>
//           </Button>
//           <div className={`sidebar-submenu-wrapper ${activeTab === 1 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
//             <ul className="sidebar-submenu list-unstyled">
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="stock" end>
//                   <HiListBullet /> لیست انبار ها
//                 </NavLink>
//               </li>
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="addstock" end>
//                   <RiInboxArchiveLine /> اضافه کردن انبار جدید
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </li>
//         <li className="sidebar-list__item">
//           <Button className={`sidebar-list__btn w-100 ${activeTab === 4 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(4)}>
//             <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
//               <GrDropbox />
//             </span>
//             محصول
//             <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
//               <FaAngleLeft></FaAngleLeft>
//             </span>
//           </Button>
//           <div className={`sidebar-submenu-wrapper ${activeTab === 4 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
//             <ul className="sidebar-submenu list-unstyled">
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="product/all" end>
//                   <HiListBullet /> لیست محصولات
//                 </NavLink>
//               </li>
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="addproduct" end>
//                   <RiInboxArchiveLine /> اضافه کردن محصول جدید
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </li>
//         <li className="sidebar-list__item">
//           <Button className={`sidebar-list__btn w-100 ${activeTab === 2 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(2)}>
//             <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
//               <HiOutlineUser />
//             </span>
//             کاربران
//             <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
//               <FaAngleLeft></FaAngleLeft>
//             </span>
//           </Button>
//           <div className={`sidebar-submenu-wrapper ${activeTab === 2 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
//             <ul className="sidebar-submenu list-unstyled">
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="users" end>
//                   <HiOutlineUsers /> لیست کاربران
//                 </NavLink>
//               </li>
//               <li className="sidebar-submenu__item">
//                 <NavLink to={"newUser"} end className="sidebar-list__link">
//                   <HiOutlineUserPlus /> ثبت نام کاربر جدید
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </li>
//         <li className="sidebar-list__item">
//           <Button className={`sidebar-list__btn w-100 ${activeTab === 3 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(3)}>
//             <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
//               <IoTimeOutline />
//             </span>
//             شیفت
//             <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
//               <FaAngleLeft></FaAngleLeft>
//             </span>
//           </Button>
//           <div className={`sidebar-submenu-wrapper ${activeTab === 3 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
//             <ul className="sidebar-submenu list-unstyled">
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="shift" end>
//                   <RiTimelineView /> لیست شیفت ها
//                 </NavLink>
//               </li>
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="addshift" end>
//                   <MdMoreTime /> اضافه کردن شیفت جدید
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </li>
//       </ul>
//       <br />
//       <div className="sidebar-logout-wrapper">
//         <div className="sidebar-logout">
//           <Button variant="contained" onClick={handleCloseMyAcc} >
//             <IoMdLogOut></IoMdLogOut>
//             خروج
//           </Button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// ver 1
// export default function SideBar() {
//   const context = useContext(MyContext);
//   const [activeTab, setActiveTab] = useState(0);
//   const [isToggleSubMenu, setIsToggleSubMenu] = useState(false);
//   const [isToggleSubSubMenu, setIsToggleSubSubMenu] = useState(false); // وضعیت جدید برای زیر منو
//   const navigate = useNavigate();

//   const isOpenSubmenu = (index) => {
//     setActiveTab(index);
//     setIsToggleSubMenu(!isToggleSubMenu);
//   };

//   const isOpenSubSubmenu = () => {
//     setIsToggleSubSubMenu(!isToggleSubSubMenu); // تابع برای مدیریت زیر منو
//   };

//   const handleCloseMyAcc = () => {
//     Cookies.remove("token");
//     navigate("/");
//   };

//   return (
//     <aside className="sidebar">
//       <ul className="sidebar-list list-unstyled">
//         <li className="sidebar-list__item">
//           <Button className={`sidebar-list__btn w-100 ${activeTab === 4 && isToggleSubMenu === true ? "active" : ""}`} onClick={() => isOpenSubmenu(4)}>
//             <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
//               <GrDropbox />
//             </span>
//             محصول
//             <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
//               <FaAngleLeft></FaAngleLeft>
//             </span>
//           </Button>
//           <div className={`sidebar-submenu-wrapper ${activeTab === 4 && isToggleSubMenu === true ? "sub-collapse" : "sub-collapsed"}`}>
//             <ul className="sidebar-submenu list-unstyled">
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="product/all" end>
//                   <HiListBullet /> لیست محصولات
//                 </NavLink>
//               </li>
//               <li className="sidebar-submenu__item">
//                 <NavLink className="sidebar-list__link" to="addproduct" end>
//                   <RiInboxArchiveLine /> اضافه کردن محصول جدید
//                 </NavLink>
//               </li>
//               <li className="sidebar-submenu__item">
//                 <Button className={`sidebar-list__btn w-100 ${isToggleSubSubMenu ? "active" : ""}`} onClick={isOpenSubSubmenu}>
//                   زیر منو
//                   <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
//                     <FaAngleLeft></FaAngleLeft>
//                   </span>
//                 </Button>
//                 <div className={`sidebar-submenu-wrapper ${isToggleSubSubMenu ? "sub-collapse" : "sub-collapsed"}`}>
//                   <ul className="sidebar-submenu list-unstyled">
//                     <li className="sidebar-submenu__item">
//                       <NavLink className="sidebar-list__link" to="subproduct1" end>
//                         زیر محصول ۱
//                       </NavLink>
//                     </li>
//                     <li className="sidebar-submenu__item">
//                       <NavLink className="sidebar-list__link" to="subproduct2" end>
//                         زیر محصول ۲
//                       </NavLink>
//                     </li>
//                   </ul>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </li>
//       </ul>
//       <br />
//       <div className="sidebar-logout-wrapper">
//         <div className="sidebar-logout">
//           <Button variant="contained" onClick={handleCloseMyAcc} color="secondary">
//             <IoMdLogOut></IoMdLogOut>
//             خروج
//           </Button>
//         </div>
//       </div>
//     </aside>
//   );
// }

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
          <Button className={`sidebar-list__btn w-100 ${activeTab === 1 && isToggleSubMenu ? "active" : ""}`} onClick={() => isOpenSubmenu(1)}>
            <span className="sidebar-list__icon d-flex align-items-center justify-content-center">
              <TbBuildingEstate />
            </span>
            اموال
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
                    <BsBoxes /> نامه ها
                  </div>
                  <span className="sidebar-list__arrow d-flex align-items-center justify-content-center">
                    <FaAngleLeft />
                  </span>
                </Button>
                <div className={`sidebar-submenu-wrapper ${submenuStates.subMenu2 ? "sub-collapse" : "sub-collapsed"}`}>
                  <ul className="sidebar-submenu list-unstyled">
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="addstock" end>
                        همه نامه ها
                      </NavLink>
                    </li>
                    <li className="sidebar-submenu__item">
                      <NavLink className="sidebar-list__link" to="stock" end>
                        ایجاد نامه
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
