import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      return localStorage.getItem("access_token")
        ? redirect("/Homepage")
        : null;
    },
  },
  {
    path: "/Homepage",
    element: <h1>Hallo boss</h1>,
  },
]);

export default router;
