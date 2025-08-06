import { useUser } from "@clerk/clerk-react";

import { Heart } from "lucide-react";
import { useAppContext } from "../context/AppContextProvider";
import ActionButtons from "../components/ActionButtons";

const Community = () => {
  const { user } = useUser();
  const { publishedCreations } = useAppContext();

  console.log(publishedCreations);

  return (
    <div className="flex-1 h-full flex flex-col gap-4  p-2">
      <h1 className="text-2xl">Creations</h1>

      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll ">
        {publishedCreations.map((item, index) => (
          <div
            key={index}
            className="relative group inline-block  pl-3 pt-3 pr-3  sm:max-w-1/2 lg:max-w-1/3 w-full"
          >
            <img
              src={item.imageUrl}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute w-auto bottom-2 right-5 hidden group-hover:flex px-3 py-2 rounded-full bg-white">
              <ActionButtons result={item.imageUrl} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
