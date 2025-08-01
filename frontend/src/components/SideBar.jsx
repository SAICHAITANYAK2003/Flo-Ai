import React, { use, useState } from "react";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  FileText,
  Scissors,
  Users,
  User,
  LogOut,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    icon: <House />,
  },
  {
    to: "/ai/write-article",
    label: "Write Article",
    icon: <SquarePen />,
  },
  {
    to: "/ai/blog-titles",
    label: "Blog Titles",
    icon: <Hash />,
  },
  {
    to: "/ai/generate-images",
    label: "Generate Images",
    icon: <Image />,
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    icon: <Eraser />,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Object",
    icon: <Scissors />,
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    icon: <FileText />,
  },
  {
    to: "/ai/community",
    label: "Community",
    icon: <Users />,
  },
];

const SideBar = ({ menuStatus, setMenuStatus }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <>
      {/* Desktop View */}
      <div className="w-60 bg-white h-auto flex-col justify-between    border-slate-200 hidden md:flex">
        <div className="flex flex-col justify-between">
          <div className="my-7 w-full flex flex-col justify-center items-center">
            <img
              src={user.imageUrl}
              alt="user-image"
              className="w-18 h-18 rounded-full hover:ring-2 hover:ring-primary p-0.5"
            />
            <p className="mt-3.5">{user.fullName}</p>
          </div>

          <div className="flex flex-col w-full  px-3">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  ` flex items-center gap-3 py-3 px-2 rounded-md hover:bg-blue-50  ${
                    isActive
                      ? " bg-gradient-to-r from-grfrom to-grto text-white"
                      : null
                  }  `
                }
                end={item.to === "/ai"}
              >
                <span>{item.icon}</span>
                <p>{item.label}</p>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 py-5 px-3 border-t border-gray-300">
          <div
            onClick={() => openUserProfile()}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="bg-gradient-to-r from-grfrom to-grto text-white p-2 rounded-full">
              <User />
            </span>
            <div className="flex flex-col ">
              <p>{user.fullName}</p>
              <p className="text-gray-500">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>{" "}
                Plan
              </p>
            </div>
          </div>
          <span className="cursor-pointer hover:bg-gray-100 p-2 rounded-full">
            <LogOut onClick={() => signOut()} />
          </span>
        </div>
      </div>

      {/* Mobile View */}
      {menuStatus && (
        <>
          <div
            onClick={() => setMenuStatus(false)} // close on backdrop click
            className="fixed inset-0 bg-white/10 backdrop-blur-sm z-40"
          ></div>
          <div
            className={`fixed top-0 bottom-0 right-0 w-60 h-full z-50 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
              menuStatus ? "translate-x-0" : "translate-x-full"
            } flex flex-col justify-between`}
          >
            <div className="flex flex-col justify-between h-auto">
              {/* User Image and Name */}
              <div className="my-7 w-full flex flex-col  justify-between items-center">
                <img
                  src={user.imageUrl}
                  alt="user-image"
                  className="w-18 h-18 rounded-full hover:ring-2 hover:ring-primary p-0.5"
                />
                <p className="mt-3.5">{user.fullName}</p>
              </div>

              {/* Dashboard Links */}
              <div className="flex flex-col w-full  px-3">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={({ isActive }) =>
                      ` flex items-center gap-3 py-3 px-2 rounded-md hover:bg-blue-50  ${
                        isActive
                          ? " bg-gradient-to-r from-grfrom to-grto text-white"
                          : null
                      }  `
                    }
                    end={item.to === "/ai"}
                  >
                    <span>{item.icon}</span>
                    <p>{item.label}</p>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* View User profile */}

            <div className="flex items-center gap-4 py-5 px-3 border-t border-gray-300">
              <div
                onClick={() => openUserProfile()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="bg-gradient-to-r from-grfrom to-grto text-white p-2 rounded-full">
                  <User />
                </span>
                <div className="flex flex-col ">
                  <p>{user.fullName}</p>
                  <p className="text-gray-500">
                    <Protect plan="premium" fallback="Free">
                      Premium
                    </Protect>{" "}
                    Plan
                  </p>
                </div>
              </div>
              <span className="cursor-pointer hover:bg-gray-100 p-2 rounded-full">
                <LogOut onClick={() => signOut()} />
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
