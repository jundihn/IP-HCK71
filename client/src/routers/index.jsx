import { createBrowserRouter, redirect } from "react-router-dom";
// import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import Homepage from "../components/Homepage";
import HomePage from "../HomePage";
import RootLayout from "../layouts/RootLayout";
import FormEdit from "../components/FormEdit";
import RegisterPage from "../components/RegisterPage";
import WishList from "../components/WishList";
import Payment from "../components/Payment";

const router = createBrowserRouter([
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
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/Homepage",
    element: <Homepage />,
  },
  {
    path: "/edit_profile",
    element: <FormEdit />,
  },
  {
    path: "/wishList",
    element: <WishList />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  //   loader: () => {
  //     return localStorage.getItem("access_token") ? redirect("/") : null;
  //   },
  // },
  // {
  //   path: "/Homepage",
  //   element: <Homepage />,
  //   loader: () => {
  //     return localStorage.getItem("access_token") ? redirect("/") : null;
  //   },
  // },
  // {
  //   path: "/",
  //   element: <Homepage />,
  //   loader: () => {
  //     return localStorage.getItem("access_token")
  //       ? redirect("/Homepage")
  //       : null;
  //   },
  // },
  // {
  //   path: "/",
  //   element: <RootLayout />,
  //   children: [
  //     {
  //       path: "detail/:id",
  //       element: <DetailTransportation />,
  //     },
  //     {
  //       path: "about",
  //       element: <About />,
  //     },
  //   ],
  // },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  //   loader: () => {
  //     return localStorage.getItem("access_token")
  //       ? redirect("/Homepage")
  //       : null;
  //   },
  // },
  // {
  //   path: "/Homepage",
  //   element: <Homepage />,
  //   loader: () => {
  //     return !localStorage.getItem("access_token") ? redirect("/login") : null;
  //   },
  // },
  // {
  //   path: "/Homepage",
  //   element: <Homepage />,
  //   // loader: () => {
  //   //   return !localStorage.getItem("access_token") ? redirect("/login") : null;
  //   // },
  // },
]);

export default router;
