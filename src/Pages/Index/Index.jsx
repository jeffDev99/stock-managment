import React, { useEffect, useState } from "react";
import DashboardBox from "../../Components/DashboardBox/DashboardBox";
import api from "../../Services/config";
// icons
import { TbBuildingEstate } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiHomeOfficeLine } from "react-icons/ri";

import "./index.css";
export default function Index() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/Auth/getusers");
        setUsers(res.data.$values);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className="row dashboardBoxWrapperRow">
      <div className="dashboardBoxWrapper d-flex">
        <DashboardBox bgColor={["#1da256", "#48d483"]} icon={<TbBuildingEstate />} title="اموال" subTitle={"مدیریت اموال و دارایی ها"} />
        <DashboardBox bgColor={["#c012e2", "#eb64fe"]} icon={<GiMoneyStack />} title="مالی" subTitle={"مدیریت مالی"} />
        <DashboardBox bgColor={["#2c78e5", "#60aff5"]} icon={<HiOutlineUsers />} title="منابع انسانی" subTitle={"مدیریت منابع انسانی"} />
        <DashboardBox bgColor={["#e1950e", "#f3cd29"]} icon={<RiHomeOfficeLine />} title="اتوماسیون اداری" subTitle={"اتوماسیون اداری موسسه"} />
      </div>
      <div className="col-12 col-md-6 mt-4">
        <div className="card shadow border-0 p-3">
          <div className="row card-filters">
            <h4 className="card__title mb-3">لیست کاربران</h4>
          </div>
          
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام</th>
                <th>نام خانوادگی</th>
                <th>نام کاربری</th>
                <th>ایمیل</th>
              </tr>
            </thead>
            <tbody>
              {Users.length ? (
                Users.map((mainUsers, index) => (
                  <tr key={mainUsers.UsersID}>
                    <td>{index + 1}</td>
                    <td>{mainUsers.firstName}</td>
                    <td>{mainUsers.lastName}</td>
                    <td>{mainUsers.userName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}><span className="loader"></span> </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-4">b</div>
    </div>
  );
}
