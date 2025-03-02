import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet /> {/* This is where your route components will render */}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
