import { Sparkles, SquarePen } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContextProvider";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const articleLengths = [
  { length: 800, text: "Short (500 - 800 words)" },
  { length: 1200, text: "Medium (800 - 1200 words)" },
  { length: 1600, text: "Long (1200+ words)" },
];

const WriteArticle = () => {
  const [selectedLength, setSelectedLength] = useState(articleLengths[0]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const { writeArticleFun, loading, setLoading } = useAppContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await writeArticleFun({
        input,
        length: selectedLength.length,
      });

      if (data.success) {
        setResult(data.message);
        console.log(`Article data `, data);
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
              <Sparkles className="text-[#226BFF]" />
            </span>
            <h1 className="text-2xl">AI Article Writer</h1>
          </div>

          {/* Input Bar */}
          <div className="mt-8 flex flex-col space-y-2">
            <label htmlFor="name">Article Topic</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              name="text"
              className="w-full py-2.5 border pl-2 border-gray-300 rounded-md outline-none"
              type="text"
              placeholder="The future of artificial intelligence ..."
              required
            />
          </div>

          <div className="mt-7">
            <p>Article Length</p>

            <ul className="flex flex-wrap mt-5 gap-4">
              {articleLengths.map((aritcle, index) => (
                <li
                  onClick={() => setSelectedLength(aritcle)}
                  key={index}
                  className={`px-6 py-2    rounded-full cursor-pointer ${
                    selectedLength.text === aritcle.text
                      ? "border-[#226BFF] border-[1.5px] text-blue-600 bg-blue-50"
                      : "border-gray-300 border text-secondary"
                  }`}
                >
                  <p>{aritcle.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="flex  items-center justify-center gap-4 mt-10 w-full     py-3 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white  rounded-xl cursor-pointer"
          >
            <span>
              <SquarePen />
            </span>
            Generate article
          </button>
        </form>

        {/* Right Col */}

        <div className="bg-white p-8 rounded-md border border-gray-200 flex-1 flex-col">
          <div className="flex items-center space-x-3">
            <span>
              <SquarePen className="text-[#226BFF]" />
            </span>
            <h2 className="text-2xl">Generated Article</h2>
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
                  <SquarePen className="text-[#64748B80]" size={40} />
                </span>
                <p className="mt-3 text-secondary text-center">
                  Enter a topic and click “Generate article ” to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteArticle;
