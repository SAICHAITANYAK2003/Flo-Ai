import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <div className="p-4 flex flex-col items-center justify-between w-full border border-gray-200 rounded-md bg-white px-10">
      <div className="flex   items-center justify-between w-full">
        <div className="space-y-3">
          <h1>{item.prompt}</h1>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="bg-blue-50 px-4 py-1 border border-blue-300 text-blue-600 rounded-full">
            {item.type}
          </p>

          <button
            onClick={() => setShowContent((prev) => !prev)}
            className="cursor-pointer   hover:bg-gray-100 p-1 rounded-full"
          >
            <ChevronDown />
          </button>
        </div>
      </div>

      {showContent ? (
        <div className="w-full mt-4 border p-6 border-gray-300 rounded-2xl">
          {item.type === "image" ? (
            <div>
              <img src={item.content} alt="image" className="mt-4" />
            </div>
          ) : (
            <div className="mt-5 reset-tw">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CreationItem;
