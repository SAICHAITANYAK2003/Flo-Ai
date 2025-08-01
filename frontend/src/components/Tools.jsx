import React from "react";
import { AiToolsData } from "../assets/assets";
import { Icon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Tools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <section
      className="w-full flex flex-col items-center justify-center py-30 px-5
    md:px-20 "
    >
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Powerful AI Tools</h1>
        <p className="text-secondary mt-6 ">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      <div className="grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-7 mt-15">
        {AiToolsData.map((tool, index) => (
          <div
            onClick={() => user && navigate(tool.path)}
            key={index}
            className="bg-white px-9 py-9 space-y-6 shadow-lg rounded-2xl border border-gray-200 cursor-pointer hover:-translate-y-1.5 transition-all duration-500 w-full"
          >
            <tool.Icon
              size={30}
              style={{
                backgroundImage: `linear-gradient(to bottom, ${tool.bg.from} ,${tool.bg.to})`,
              }}
              className="w-15 h-15 p-3 rounded-2xl text-white"
            />
            <h2 className="text-xl font-medium ">{tool.title}</h2>
            <p className="text-secondary">{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
