import { Sparkles, Eraser, Fullscreen } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContextProvider";

const RemoveBg = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const { removeBgFun } = useAppContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const data = await removeBgFun(formData);

      if (data.success) {
        setResult(data.message);
        console.log(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFile("");
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
              <Sparkles className="text-[#FF4938]" />
            </span>
            <h1 className="text-2xl">Background Removal</h1>
          </div>

          {/* Input File Bar */}
          <div className="mt-8 flex flex-col space-y-2">
            <label htmlFor="name">Upload Image</label>
            <input
              accept="image/*"
              rows={5}
              onChange={(e) => setFile(e.target.files[0])}
              name="file"
              className="w-full py-2.5 border pl-2 border-gray-300 rounded-md outline-none cursor-pointer  "
              type="file"
              placeholder="Describe what you want to see in the image.."
              required
            />
            <p className="text-secondary text-xs">
              Supports JPG, PNG, and other image formats
            </p>
          </div>

          <button
            type="submit"
            className="flex  items-center justify-center gap-4 mt-10 w-full     py-3 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white  rounded-xl cursor-pointer"
          >
            <span>
              <Eraser />
            </span>
            Remove Background
          </button>
        </form>

        {/* Right Col */}

        <div className="bg-white p-8 rounded-md border border-gray-200 flex-1 flex-col">
          <div className="flex items-center space-x-3">
            <span>
              <Eraser className="text-[#FF4938]" />
            </span>
            <h2 className="text-2xl">Processed Image</h2>

           
          </div>
           <div className="mt-3 w-full flex  justify-end ">
              <a href={result} target="_blank" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Fullscreen/>
              </a>
            </div>

          {/* Generated Content */}

          <div className=" flex flex-col   h-[450px] overflow-y-auto   mt-2 ">
            {result ? (
              <>
                <div className="flex flex-col items-start gap-4 mt-20">
                  <img src={result} alt="background removed image" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <span>
                  <Eraser className="text-[#64748B80]" size={40} />
                </span>
                <p className="mt-3 text-secondary text-center">
                  Upload an image and click "Remove Background" to get started
                </p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default RemoveBg;
