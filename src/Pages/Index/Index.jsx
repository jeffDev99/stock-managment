import React, { useEffect, useState } from "react";
import DashboardBox from "../../Components/DashboardBox/DashboardBox";
import api from "../../Services/config";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// icons
import { TbBuildingEstate } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiHomeOfficeLine } from "react-icons/ri";
// styles
import "./index.css";

export default function Index() {
  const [Users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page

  const data = [
    {
      name: "انبار 1",
      uv: 40,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "انبار 2",
      uv: 25,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "انبار 3",
      uv: 20,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "انبار 4",
      uv: 27,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "انبار 5",
      uv: 18,
      pv: 4800,
      amt: 2181,
    },
  ];

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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = Users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(Users.length / usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                {currentUsers.length ? (
                  currentUsers.map((mainUsers, index) => (
                    <tr key={mainUsers.UsersID}>
                      <td>{indexOfFirstUser + index + 1}</td>
                      <td>{mainUsers.firstName}</td>
                      <td>{mainUsers.lastName}</td>
                      <td>{mainUsers.userName}</td>
                      <td>{mainUsers.email}</td> {/* Assuming you have an email field */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <span className="loader"></span>{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination d-flex justify-content-center align-items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`} 
                style={{ backgroundColor: currentPage === index + 1 ? '#ce9e48' : '#fff' , width: 30, height: 30 ,borderRadius: '10px',color:currentPage===index + 1?"#fff":"#000"  , border: 'none' }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-4">
        <div className="card shadow border-0 p-3" style={{ width: "100%", height: 400 }}>
          <div className="row card-filters">
            <h4 className="card__title mb-3">گزارش محصولات ثبت شده در انبارها</h4>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#ce9e48" fill="#ce9e48" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}