import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function RootLayout() {
  return (
    <>
      <div className="100vh">
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  );
}
