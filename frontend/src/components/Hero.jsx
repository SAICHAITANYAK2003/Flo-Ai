import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
      className="py-40 flex flex-col items-center justify-center bg-cover bg-no-repeat w-full relative min-h-screen"
    >
      <div className="text-center px-0.5">
        <h1 className="text-4xl md:text-5xl  leading-[1.2] font-medium">
          Create amazing content <br />
          with
          <span className="text-primary"> AI tools</span>
        </h1>
        <p className="text-secondary   max-w-sm md:max-w-lg xl:max-w-xl mt-6">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      <div className="mt-10 flex items-center justify-center w-full flex-wrap gap-7">
        <button
          onClick={() => navigate("/ai")}
          className="px-6 py-3 bg-primary text-white rounded-xl cursor-pointer hover:scale-105 transition-all duration-500  "
        >
          Start creating now
        </button>
        <button className="px-6 py-3 bg-white border border-zinc-300 rounded-xl cursor-pointer hover:scale-105 transition-all duration-500  ">
          Watch demo
        </button>
      </div>

      <div className="mt-13 flex flex-wrap items-center justify-center w-full gap-4">
        <img src={assets.user_group} alt="user-group" className="w-30" />
        <p className="text-secondary">Trusted by 10k+ people</p>
      </div>
    </section>
  );
};

export default Hero;
