import { Sparkles, Scissors, Fullscreen } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContextProvider";

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const { removeObjectFun } = useAppContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    let object = input;

    try {
      if (object.split(" ").length > 1) {
        return toast("Please enter only one object name");
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("object", object);

      const data = await removeObjectFun(formData);

      if (data.success) {
        setResult(data.message);
        console.log(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInput("");
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
              <Sparkles className="text-[#4A7AFF]" />
            </span>
            <h1 className="text-2xl">Object Removal</h1>
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

          {/* Input Bar */}
          <div className="mt-8 flex flex-col space-y-2">
            <label htmlFor="name">Describe object to remove</label>
            <textarea
              id="text"
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name="text"
              className="w-full py-2.5 border pl-2 border-gray-300 rounded-md outline-none"
              type="text"
              placeholder="e.g., car in background, tree from the image"
              required
            />
            <p className="text-secondary">
              Be specific about what you want to remove
            </p>
          </div>

          <button
            type="submit"
            className="flex  items-center justify-center gap-4 mt-10 w-full     py-3 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white  rounded-xl cursor-pointer"
          >
            <span>
              <Scissors />
            </span>
            Remove Object
          </button>
        </form>

        {/* Right Col */}

        <div className="bg-white p-8 rounded-md border border-gray-200 flex-1 flex-col">
          <div className="flex items-center space-x-3">
            <span>
              <Scissors className="text-[#4A7AFF]" />
            </span>
            <h2 className="text-2xl">Processed Image</h2>
          </div>

          <div className="mt-3 w-full flex  justify-end ">
            <a
              href={result}
              target="_blank"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <Fullscreen />
            </a>
          </div>

          {/* Generated Content */}

          <div className=" flex flex-col   h-[450px] overflow-y-auto   mt-2 ">
            {result ? (
              <div className="mt-20">
                <img src={result} alt="Object removed image" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <span>
                  <Scissors className="text-[#64748B80]" size={40} />
                </span>
                <p className="mt-3 text-secondary text-center">
                  Upload an image and describe what to remove
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveObject;
