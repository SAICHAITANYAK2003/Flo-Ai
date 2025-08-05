import { Sparkles, Hash } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import { useAppContext } from "../context/AppContextProvider";

const blogCategories = [
  "General",
  "Technology",
  "Business",
  "Health",
  "Lifestyle",
  "Education",
  "Travel",
  "Food",
];

const BlogTitles = () => {
  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const { blogTitlesFun, loading, setLoading } = useAppContext();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await blogTitlesFun({
        input,
        category: selectedCategory,
      });

      if (data.success) {
        setResult(data.message);
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
              <Sparkles className="text-[#8E37EB]" />
            </span>
            <h1 className="text-2xl">AI Title Generator</h1>
          </div>

          {/* Input Bar */}
          <div className="mt-8 flex flex-col space-y-2">
            <label htmlFor="name">Keyword</label>
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
            <p>Category</p>

            <ul className="flex flex-wrap mt-5 gap-4">
              {blogCategories.map((blog, index) => (
                <li
                  onClick={() => setSelectedCategory(blog)}
                  key={index}
                  className={`px-6 py-2    rounded-full cursor-pointer ${
                    selectedCategory === blog
                      ? "border-[#226BFF] border-[1.5px] text-blue-600 bg-blue-50"
                      : "border-gray-300 border text-secondary"
                  }`}
                >
                  <p>{blog}</p>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="flex  items-center justify-center gap-4 mt-10 w-full     py-3 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white  rounded-xl cursor-pointer"
          >
            <span>
              <Hash />
            </span>
            Generate title
          </button>
        </form>

        {/* Right Col */}

        <div className="bg-white p-8 rounded-md border border-gray-200 flex-1 flex-col">
          <div className="flex items-center space-x-3">
            <span>
              <Hash className="text-[#8E37EB]" />
            </span>
            <h2 className="text-2xl">Generated Titles</h2>
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
                  <Hash className="text-[#64748B80]" size={40} />
                </span>
                <p className="mt-3 text-secondary text-center">
                  Enter keywords and click "Generate Titles" to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTitles;
