import { Navigate } from "react-router-dom";
// layout components
import Dashboard from "./Layout/Dashboard/Dashboard";
import Auth from "./Layout/Auth/Auth";
// Dashboard Components
import Stock from "./Pages/Stock/Stock";
import AddStock from "./Pages/AddStock/AddStock";
import EditStock from "./Pages/EditStock/EditStock";
import NotFound from "./Pages/NotFound/NotFound";
import NewUser from "./pages/NewUser/NewUser";
import Users from "./pages/Users/Users";
import Product from "./pages/Product/Product";
import EditProduct from "./pages/EditProduct/EditProduct";
import AddProduct from "./pages/AddProduct/AddProduct";
import Shift from "./Pages/Shift/Shift";
import AddShift from "./Pages/AddShift/AddShift";

// Auth Components
import Login from "./Pages/Login/Login";
// import Register from "./Pages/Register/Register";
// protected Components
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
let routes = [
  // dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
      <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Navigate to={"stock"} /> },
      { path: "Users", element: <Users /> },
      { path: "newUser", element: <NewUser /> },
      { path: "stock", element: <Stock /> },
      { path: "addstock", element: <AddStock /> },
      { path: "editstock/:id", element: <EditStock /> },
      { path: "product/:stockId", element: <Product /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "editproduct/:id", element: <EditProduct /> },
      { path: "shift", element: <Shift /> },
      { path: "addshift", element: <AddShift /> },
      // { path: "editshift/:id", element: <EditShift /> },
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
