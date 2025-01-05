import React, { useState, useContext } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import { MdMenuOpen } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { FiBell } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { MyContext } from "../../Layout/Dashboard/Dashboard";
import Cookies from "js-cookie";

import "../../var.css";
import "./TopBar.css";

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotifications, setIsOpenNotifications] = useState(null);
    const navigate = useNavigate();

  const context = useContext(MyContext);

  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpenNotifications);

  const handleOpenMyAcc = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorEl(null);
    Cookies.remove("token");
    navigate("/");
  };
  const handleOpenNotifications = (event) => {
    setIsOpenNotifications(event.currentTarget);
  };
  const handleCloseNotifications = () => {
    setIsOpenNotifications(null);
  };
  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-5 col-md-2 d-flex align-items-center justify-content-center">
              <Link to="/">
                <img src="/images/logo.png" className="header-logo__img" alt="" />
              </Link>
            </div>
            <div className="col-md-3 d-flex align-items-center d-none d-md-flex">
              <Button variant="contained" className="header__menu-btn btn rounded-circle p-0 ms-2 ms-md-3" onClick={() => context.setIsToggleSideBar(!context.isToggleSideBar)}>
                {context.isToggleSideBar === false ? <MdMenuOpen /> : <MdOutlineMenu />}
              </Button>
              <SearchBox></SearchBox>
            </div>
            <div className="col-7 col-md-7 d-flex align-items-center justify-content-end">
              <Button variant="contained" className="header__menu-btn btn rounded-circle p-0 ms-2 ms-md-3  d-block d-md-none" onClick={() => context.setIsToggleSideBar(!context.isToggleSideBar)}>
                {context.isToggleSideBar === false ? <MdMenuOpen /> : <MdOutlineMenu />}
              </Button>
              <Button variant="contained" className="header__menu-btn btn rounded-circle p-0 ms-2 ms-md-3" onClick={() => context.setThemeMode(!context.themeMode)}>
                <CiLight></CiLight>
              </Button>
              <div className="dropDown-wrapper position-relative">
                <Button variant="contained" className="header__menu-btn btn rounded-circle p-0  ms-2 ms-md-3" onClick={handleOpenNotifications}>
                  <FiBell></FiBell>
                </Button>
                <Menu
                  anchorEl={isOpenNotifications}
                  className="notifications dropdown-list"
                  id="notifications"
                  open={openNotifications}
                  onClose={handleCloseNotifications}
                  onClick={handleCloseNotifications}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseNotifications}>
                    <h4 className="head p-0 m-0 pl-3"> سفارشات (12) </h4>
                  </MenuItem>
                  <Divider />
                  <div className="dropdown-list__scroll">
                    <MenuItem onClick={handleCloseNotifications}>
                      <div>
                        <div className="myAcc__userImg">
                          <span className="rounded-circle">
                            <img src="images/blank-profile-picture-973460_960_720.webp" alt="" srcSet="" />
                          </span>
                        </div>
                      </div>
                      <div className="dropDown-info">
                        <h4>
                          <span>
                            این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است
                          </span>
                          <p className="text-sky">لحظاتی پیش</p>
                        </h4>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotifications}>
                      <div>
                        <div className="myAcc__userImg">
                          <span className="rounded-circle">
                            <img src="images/blank-profile-picture-973460_960_720.webp" alt="" srcSet="" />
                          </span>
                        </div>
                      </div>
                      <div className="dropDown-info">
                        <h4>
                          <span>
                            این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است
                          </span>
                          <p className="text-sky">لحظاتی پیش</p>
                        </h4>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotifications}>
                      <div>
                        <div className="myAcc__userImg">
                          <span className="rounded-circle">
                            <img src="images/blank-profile-picture-973460_960_720.webp" alt="" srcSet="" />
                          </span>
                        </div>
                      </div>
                      <div className="dropDown-info">
                        <h4>
                          <span>
                            این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است
                          </span>
                          <p className="text-sky">لحظاتی پیش</p>
                        </h4>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotifications}>
                      <div>
                        <div className="myAcc__userImg">
                          <span className="rounded-circle">
                            <img src="images/blank-profile-picture-973460_960_720.webp" alt="" srcSet="" />
                          </span>
                        </div>
                      </div>
                      <div className="dropDown-info">
                        <h4>
                          <span>
                            این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است
                          </span>
                          <p className="text-sky">لحظاتی پیش</p>
                        </h4>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotifications}>
                      <div>
                        <div className="myAcc__userImg">
                          <span className="rounded-circle">
                            <img src="images/blank-profile-picture-973460_960_720.webp" alt="" srcSet="" />
                          </span>
                        </div>
                      </div>
                      <div className="dropDown-info">
                        <h4>
                          <span>
                            این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است
                          </span>
                          <p className="text-sky">لحظاتی پیش</p>
                        </h4>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotifications}>
                      <div>
                        <div className="myAcc__userImg">
                          <span className="rounded-circle">
                            <img src="images/blank-profile-picture-973460_960_720.webp" alt="" srcSet="" />
                          </span>
                        </div>
                      </div>
                      <div className="dropDown-info">
                        <h4>
                          <span>
                            این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است این یک پیام<strong>تستی</strong> است
                          </span>
                          <p className="text-sky">لحظاتی پیش</p>
                        </h4>
                      </div>
                    </MenuItem>
                  </div>
                  <div className="p-2 w-100">
                    <Button className="dropdown-list__btn w-100">همه ی اعلانات</Button>
                  </div>
                </Menu>
              </div>
              <div className="myAcc-wrapper">
                <Button className="myAcc d-flex align-items-center px-0 " onClick={handleOpenMyAcc}>
                  <div className="myAcc__userImg">
                    <span className="rounded-circle">
                      <img src="images/blank-profile-picture-973460_960_720.webp" alt="" srcSet="" />
                    </span>
                  </div>
                  <div className="d-none d-lg-block userInfo">
                    <h4>سید محمد امین جعفرنژاد</h4>
                    <p className="mb-0 ">@jeffDev99</p>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handleCloseMyAcc}
                  onClick={handleCloseMyAcc}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseMyAcc}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    پنل کاربری
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAcc}>
                    <ListItemIcon>
                      <FaShieldAlt></FaShieldAlt>
                    </ListItemIcon>
                    بازیابی رمز
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAcc}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    خروج
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
