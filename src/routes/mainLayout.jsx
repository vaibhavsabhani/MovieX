import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const MainLayout = () => (
  <div className="bg-[#020c1b] min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow ">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
