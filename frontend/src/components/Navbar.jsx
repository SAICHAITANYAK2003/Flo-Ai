import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <>
      <nav className="w-full backdrop-blur-2xl flex items-center justify-between px-10  sm:px-15 xl:px-32   z-10  fixed ">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="logo"
          className="w-50 h-17 cursor-pointer"
        />

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-primary px-3 md:px-7 py-3 rounded-full text-white cursor-pointer flex items-center justify-center gap-3 hover:scale-105 transition-all duration-500"
          >
            Get Started
            <ChevronRight />
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
