import { Sparkles, FileText } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContextProvider";
import Markdown from "react-markdown";

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(false);

  const { resumeReviewFun } = useAppContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const data = await resumeReviewFun(formData);
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
              <Sparkles className="text-[#00DA83]" />
            </span>
            <h1 className="text-2xl">Resume Review</h1>
          </div>

          {/* Input File Bar */}
          <div className="mt-8 flex flex-col space-y-2">
            <label htmlFor="name">Upload Image</label>
            <input
              accept="/*"
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
            className="flex  items-center justify-center gap-4 mt-10 w-full     py-3 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white  rounded-xl cursor-pointer"
          >
            <span>
              <FileText />
            </span>
            Resume Review
          </button>
        </form>

        {/* Right Col */}

        <div className="bg-white p-8 rounded-md border border-gray-200 flex-1 flex-col">
          <div className="flex items-center space-x-3">
            <span>
              <FileText className="text-[#00DA83]" />
            </span>
            <h2 className="text-2xl">Analysis Results</h2>
          </div>

          {/* Generated Content */}

          <div className=" flex flex-col   h-[450px] overflow-y-auto   mt-2 ">
            {result ? (
             <div className="prose prose-sm mt-5 reset-tw">
                             <Markdown>{result}</Markdown>
                           </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <span>
                  <FileText className="text-[#64748B80]" size={40} />
                </span>
                <p className="mt-3 text-secondary text-center">
                  Upload your resume and click "Review Resume" to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewResume;
