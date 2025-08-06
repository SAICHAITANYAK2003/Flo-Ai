import { Sparkles, Image } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContextProvider";
import Popover from "../components/Popover";
import ActionButtons from "../components/ActionButtons";

const imageStyles = [
  "Realistic",
  "Ghibli style",
  "Anime style",
  "Cartoon style",
  "Fantasy style",
  "3D style",
  "Potrait style",
];

const GenerateImages = () => {
  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [publish, setPublish] = useState(false);

  const { genImageFun, loading, setLoading } = useAppContext();

  console.log(publish);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await genImageFun({
        input,
        style: selectedStyle,
        publish,
      });

      if (data?.success) {
        setResult(data.message);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2   items-start gap-4">
        {/* Left Col */}
        <form
          onSubmit={onHandleSubmit}
          className="bg-white p-8 rounded-md border border-gray-200 w-full flex-1 "
        >
          <div className="flex items-center gap-4">
            <span className="">
              <Sparkles className="text-[#00AD25]" />
            </span>
            <h1 className="text-2xl">AI Image Generator</h1>
          </div>

          {/* Input Bar */}
          <div className="mt-8 flex flex-col space-y-2">
            <label htmlFor="name">Describe Your Image</label>
            <textarea
              id="text"
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name="text"
              className="w-full py-2.5 border pl-2 border-gray-300 rounded-md outline-none"
              type="text"
              placeholder="Describe what you want to see in the image.."
              required
            />
          </div>

          <div className="mt-7">
            <p>Style</p>

            <ul className="flex flex-wrap mt-5 gap-4">
              {imageStyles.map((style, index) => (
                <li
                  onClick={() => setSelectedStyle(style)}
                  key={index}
                  className={`px-6 py-2    rounded-full cursor-pointer ${
                    selectedStyle === style
                      ? "border-[#226BFF] border-[1.5px] text-blue-600 bg-blue-50"
                      : "border-gray-300 border text-secondary"
                  }`}
                >
                  <p>{style}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Make Image as public */}

          <div className="mt-7 flex items-center gap-3">
            <label className="cursor-pointer  relative   ">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer "
              />

              <div className="bg-slate-300 w-12 h-7 rounded-full peer-checked:bg-green-600 transition"></div>

              <span className="absolute top-1 left-1 w-5 h-5 rounded-full peer-checked:translate-x-5 transition bg-white"></span>
            </label>
            <p>Make this image public</p>
          </div>

          <button
            type="submit"
            className="flex  items-center justify-center gap-4 mt-10 w-full     py-3 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white  rounded-xl cursor-pointer"
          >
            <span>
              <Image />
            </span>
            Generate image
          </button>
        </form>
        {/* Right Col */}
        <div className="bg-white p-8 rounded-md border border-gray-200 flex-1 flex-col">
          <div className="flex items-center space-x-3">
            <span>
              <Image className="text-[#00AD25]" />
            </span>
            <h2 className="text-2xl">Generated Images</h2>
          </div>

          <div className=" flex  justify-end mt-2">
            <ActionButtons result={result} />
          </div>
          {/* Generated Content */}

          <div className=" flex flex-col   h-[450px] overflow-y-auto   mt-2 ">
            {result ? (
              <div className="flex items-center gap-4 mt-2">
                <img src={result} alt="generated image" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <span>
                  <Image className="text-[#64748B80]" size={40} />
                </span>
                <p className="mt-3 text-secondary text-center">
                  Enter a topic and click “Generate image ” to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateImages;
