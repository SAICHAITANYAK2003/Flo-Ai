import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart } from "lucide-react";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, []);
  return (
    <div className="flex-1 h-full flex flex-col gap-4  p-2">
      <h1 className="text-2xl">Creations</h1>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll ">
        {creations.map((item, index) => (
          <div
            key={index}
            className="relative group inline-block  pl-3 pt-3 pr-3  sm:max-w-1/2 lg:max-w-1/3 w-full"
          >
            <img
              src={item.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
            <div className=" absolute bottom-0 right-0 left-3 px-3 flex items-between     group-hover:bg-gradient-to-b from-transparent to-black/70 rounded-lg">
              <p className="w-sm text-white hidden group-hover:block mb-2">
                {item.prompt}
              </p>

              <div className="flex items-center space-x-2 text-white mb-4">
                <p>{item.likes.length}</p>
                <span
                  className={`hover:scale-110 cursor-pointer ${
                    item.likes.includes(user.id)
                      ? " fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                >
                  <Heart />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
