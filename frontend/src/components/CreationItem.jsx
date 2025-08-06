import { useState } from "react";
import { ChevronDown, Download, Fullscreen } from "lucide-react";
import Markdown from "react-markdown";
import { useAppContext } from "../context/AppContextProvider";

const CreationItem = ({ item }) => {
  const [showContent, setShowContent] = useState(false);
  const { imageDownload } = useAppContext();

  return (
    <div className="p-4 flex flex-col items-center justify-between w-full border border-gray-200 rounded-md bg-white px-10">
      <div className="flex   items-center justify-between w-full">
        <div className="space-y-3">
          <h1>
            {item.type === "resume-review" ? "Resume Content.pdf" : item.prompt}
          </h1>
          <p className="text-gray-500">
            <span className="max-md:bg-blue-50 px-4 py-1 border border-blue-300 text-blue-600 rounded-full  md:border-none md:p-0 md:text-gray-500">
              {item.type}
            </span>{" "}
            - {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center  gap-4">
          <p className="bg-blue-50 px-4 py-1 border border-blue-300 text-blue-600 rounded-full hidden md:block">
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
          {item.content.includes("image") ? (
            <div className="flex  items-start gap-4 ">
              <img
                src={item.content}
                alt="image"
                className="mt-4 w-40 md:w-50  rounded-2xl"
              />
              <div className=" flex flex-col items-center gap-4 ">
                <a
                  target="_blank"
                  href={item.content}
                  className="bg-gray-100 hover:bg-gray-200 w-10 h-10 p-1.5 rounded-full flex items-center justify-center"
                >
                  <Fullscreen />
                </a>
                <button
                  target="_blank"
                  onClick={() =>
                    imageDownload(item.content, "download image")
                  }
                  className="bg-gray-100 hover:bg-gray-200 w-10 h-10 p-1.5 rounded-full flex items-center justify-center"
                >
                  <Download />
                </button>
              </div>
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
