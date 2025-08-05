import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { SignIn, useUser } from "@clerk/clerk-react";
import { AlignLeft } from "lucide-react";
import { useAppContext } from "../context/AppContextProvider";

const Layout = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showMobileMenu, setMobileMenu] = useState(false);
  const { userDetails } = useAppContext();
  const { userCredits, userPlan } = userDetails;

  const UserCreditsCard = () => {
    return (
      <div className="">
        <div className="flex items-center divide-x divide-gray-300 py-1 text-sm border border-gray-300 rounded-full">
          <span className="pr-1 pl-3 text-lg"></span>
          <span className="pl-2 pr-5 text-[17px] bg-gradient-to-r from-rose-500 to-indigo-500 font-medium bg-clip-text text-transparent ">
            Credits :{" "}
            {!userCredits ? (
              <span className="text-black ml-3">0</span>
            ) : (
              <span className="text-black ml-3">{userCredits}</span>
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {user ? (
        <div className="bg-slate-100 h-screen flex flex-col">
          <nav className="bg-white py-5 px-10 border-b border-slate-200 flex items-center justify-between relative">
            <p onClick={() => navigate("/")} className="cursor-pointer">
              AI NEST
            </p>

            <div className="flex items-center gap-4">
              <UserCreditsCard />

              <button
                onClick={() => setMobileMenu(true)}
                className="cursor-pointer block md:hidden"
              >
                <AlignLeft />
              </button>
            </div>
          </nav>

          <div className="flex-1  flex overflow-hidden">
            <SideBar
              menuStatus={showMobileMenu}
              setMenuStatus={setMobileMenu}
            />
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
