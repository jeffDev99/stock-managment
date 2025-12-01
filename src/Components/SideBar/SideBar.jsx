import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

// Import your icons here...
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbBuildingEstate } from "react-icons/tb";
import { RiHomeOfficeLine, RiFileList3Line, RiUserReceived2Line, RiTimelineView } from "react-icons/ri";
import { GrDropbox, GrUserSettings } from "react-icons/gr";
import { BsBoxes } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { MdMoreTime } from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import { GrProjects } from "react-icons/gr";
import "./SideBar.css";

export default function SideBar() {
  const [openMainMenu, setOpenMainMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      index: 1,
      icon: <TbBuildingEstate />,
      label: "اموال و دارایی ها",
      subItems: [
        { type: 'link', label: "انبار", path: "stock", icon: <BsBoxes /> },
        { type: 'link', label: "لیست محصولات", path: "product/all", icon: <GrDropbox /> },
        { type: 'link', label: "تخصیص محصول به کاربر", path: "transfergood", icon: <RiUserReceived2Line /> },
      ],
    },
    {
      index: 4,
      icon: <RiHomeOfficeLine />,
      label: "اتوماسیون اداری",
      subItems: [
        {
          type: 'submenu',
          name: 'reports',
          icon: <RiFileList3Line />,
          label: 'گزارشات',
          nestedItems: [
            { label: "گزارش روزانه", path: "daily-report" },
            { label: "گزارش محرمانه", path: "secret-report" },
            { label: "گزارش ماهیانه", path: "monthly-report" },
          ],
        },
        {
          type: 'submenu',
          name: 'automation_products',
          icon: <GrDropbox />,
          label: 'محصولات',
          nestedItems: [
            { label: "لیست محصولات", path: "product/all" },
            { label: "اضافه کردن محصول جدید", path: "addproduct" },
          ],
        },
      ],
    },
    {
      index: 3,
      icon: <HiOutlineUsers />,
      label: "منابع انسانی",
      subItems: [
        {
          type: 'submenu',
          name: 'shifts',
          icon: <IoTimeOutline />,
          label: 'شیفت',
          nestedItems: [
            { label: "لیست شیفت ها", path: "shift", icon: <RiTimelineView /> },
            { label: "اضافه کردن شیفت جدید", path: "addshift", icon: <MdMoreTime /> },
          ],
        },
      ],
    },
    {
      index: 6,
      icon: <BsCameraReels />,
      label: "فرهنگی",
      subItems: [
        {
          type: 'submenu',
          name: 'servants_committee',
          icon: <AiOutlineUser />,
          label: 'کمیته خادمین',
          nestedItems: [
            { label: "لیست خادمین", path: "servants" },
            { label: "اضافه کردن خادم جدید", path: "addservant" },
          ],
        },
      ],
    },
    {
      index: 2,
      icon: <GiMoneyStack />,
      label: "مالی",
      subItems: [
        {
          type: 'submenu',
          name: 'register_invoice',
          icon: <BsBoxes />,
          label: 'ثبت فاکتور', // بر اساس کد شما، آیتم‌های داخلی مربوط به انبار است
          nestedItems: [
            { label: "لیست انبار ها", path: "stock" },
            { label: "اضافه کردن انبار جدید", path: "addstock" },
          ],
        },
        {
          type: 'submenu',
          name: 'prepare_invoice',
          icon: <GrDropbox />,
          label: 'تهیه فاکتور',
          nestedItems: [
            { label: "لیست محصولات", path: "product/all" },
            { label: "اضافه کردن محصول جدید", path: "addproduct" },
          ],
        },
      ],
    },
    {
      index: 7,
      icon: <GrProjects />,
      label: 'پروژه ها',
      subItems: [{ type: 'link', label: "لیست پروژه ها", path: "projects", icon: <GrProjects /> },]

    },
    {
      index: 5,
      icon: <RiAdminLine />,
      label: "تنظیمات سیستم",
      subItems: [
        { type: 'link', label: "کاربران", path: "users", icon: <HiOutlineUser /> },
        { type: 'link', label: "سمت ها", path: "roles", icon: <GrUserSettings /> },
        // { // این بخش در کد شما کامنت شده بود، در صورت نیاز از کامنت خارج کنید
        //   type: 'submenu',
        //   name: 'roles',
        //   icon: <GrUserSettings />,
        //   label: 'سمت ها',
        //   nestedItems: [
        //     { label: "تعریف سمت", path: "define-role" },
        //     { label: "لیست سمت ها", path: "roles" },
        //   ],
        // },
      ],
    },

  ];

  const handleMainMenuClick = (index) => {
    setOpenMainMenu(openMainMenu === index ? null : index);
  };

  const handleSubMenuClick = (submenuName) => {
    setOpenSubMenu(openSubMenu === submenuName ? null : submenuName);
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
            <Button className="sidebar-list__btn w-100">
              <span className="sidebar-list__icon">
                <AiOutlineDashboard />
              </span>
              داشبورد
            </Button>
          </NavLink>
        </li>

        {menuItems.map((item) => (
          <li key={item.index} className="sidebar-list__item">
            <Button
              className={`sidebar-list__btn w-100 ${openMainMenu === item.index ? "active" : ""}`}
              onClick={() => handleMainMenuClick(item.index)}
            >
              <span className="sidebar-list__icon">{item.icon}</span>
              {item.label}
              <span className="sidebar-list__arrow">
                <FaAngleLeft />
              </span>
            </Button>
            <div className={`sidebar-submenu-wrapper ${openMainMenu === item.index ? "sub-collapse" : "sub-collapsed"}`}>
              <ul className="sidebar-submenu list-unstyled">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="sidebar-submenu__item">
                    {subItem.type === 'link' ? (
                      <NavLink className="sidebar-list__link" to={subItem.path} end>
                        {subItem.label}
                      </NavLink>
                    ) : (
                      <>
                        <Button
                          className={`sidebar-list__btn w-100 ${openSubMenu === subItem.name ? "active" : ""}`}
                          onClick={() => handleSubMenuClick(subItem.name)}
                        >
                          <div className="d-flex gap-1 align-items-center">
                            {subItem.icon} {subItem.label}
                          </div>
                          <span className="sidebar-list__arrow"><FaAngleLeft /></span>
                        </Button>
                        <div className={`sidebar-submenu-wrapper ${openSubMenu === subItem.name ? "sub-collapse" : "sub-collapsed"}`}>
                          <ul className="sidebar-submenu list-unstyled">
                            {subItem.nestedItems.map((nestedItem, nestedIndex) => (
                              <li key={nestedIndex} className="sidebar-submenu__item">
                                <NavLink className="sidebar-list__link" to={nestedItem.path} end>
                                  {nestedItem.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
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