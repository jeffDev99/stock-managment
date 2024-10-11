import routes from "./router";
import { useRoutes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./var.css";
import "./App.css";
export default function App() {
  let router = useRoutes(routes);
  return router;
}
