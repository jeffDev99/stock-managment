import { Navigate } from "react-router-dom";
// layout components
import Dashboard from "./Layout/Dashboard/Dashboard";
import Auth from "./Layout/Auth/Auth";
// Dashboard Components
import Stock from "./Pages/Stock/Stock";
import AddStock from "./Pages/AddStock/AddStock";
import EditStock from "./Pages/EditStock/EditStock";
import NotFound from "./Pages/NotFound/NotFound";
import NewUser from "./pages/NewUser/NewUser"
import Users from "./pages/Users/Users"
// Auth Components
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
// protected Components
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
let routes = [
  // dashboard
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute>
      <Dashboard />
      // </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to={"stock"} /> },
      { path: "stock", element: <Stock /> },
      { path: "newUser", element: <NewUser /> },
      { path: "Users", element: <Users /> },
      { path: "addstock", element: <AddStock /> },
      { path: "editstock/:id", element: <EditStock /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  // Auth
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "", element: <Navigate to={"/login"} /> },
      { path: "login", element: <Login /> },
      // { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  //   not found
  { path: "*", element: <NotFound /> },
];
export default routes;
