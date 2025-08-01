import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { SignIn, useUser } from "@clerk/clerk-react";
import { AlignLeft } from "lucide-react";

const Layout = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showMobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      {user ? (
        <div className="bg-slate-100 h-screen flex flex-col">
          <nav className="bg-white py-5 px-10 border-b border-slate-200 flex items-center justify-between relative">
            <p onClick={() => navigate("/")} className="cursor-pointer">
              AI NEST
            </p>

            <button
              onClick={() => setMobileMenu(true)}
              className="cursor-pointer block md:hidden"
            >
              <AlignLeft />
            </button>
          </nav>

          <div className="flex-1  flex overflow-hidden">
            <SideBar menuStatus={showMobileMenu} setMenuStatus={setMobileMenu}/>
            <div className="flex-1 overflow-y-auto p-6">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <SignIn />
        </div>
      )}
    </>
  );
};

export default Layout;
