import { Sparkles, Eraser } from "lucide-react";
import { useState } from "react";

const RemoveBg = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(false);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    console.log(file, result);

    setFile("");
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

          {/* Generated Content */}

          <div className=" flex flex-col   h-[450px] overflow-y-auto   mt-2 ">
            {result ? (
              <p className="mt-5">
                ## AI and Coding: A Symbiotic Partnership Reshaping the
                Future\n\nArtificial intelligence (AI) and coding, once distinct
                disciplines, are now deeply intertwined, forging a powerful
                symbiotic relationship that's revolutionizing industries and
                accelerating innovation. Understanding this connection is
                crucial for anyone seeking to navigate the future of
                technology.\n\nAt its core, AI is the ability of a machine to
                mimic intelligent human behavior. This is achieved through
                algorithms, which are essentially sets of instructions
                meticulously crafted by programmers – coders. Coding, therefore,
                is the backbone of AI, providing the language and structure
                necessary to bring these algorithms to life.\n\n**Coding Fuels
                AI: Building the Foundation**\n\nAI models don't magically
                appear. They are built, trained, and deployed using code. Here's
                how:\n\n* **Data Preprocessing:** Raw data, the lifeblood of AI,
                is often messy and unusable in its original form. Coders use
                programming languages like Python with libraries like Pandas and
                NumPy to clean, transform, and prepare this data for training.
                This involves handling missing values, removing inconsistencies,
                and formatting data into a suitable structure.\n* **Model
                Development:** Coders utilize programming languages like Python
                and R, coupled with machine learning libraries like TensorFlow,
                PyTorch, and scikit-learn, to build and train AI models. These
                libraries provide pre-built functionalities and tools that
                simplify the process of creating complex algorithms.\n*
                **Deployment and Integration:** Once trained, AI models need to
                be deployed and integrated into real-world applications. This
                involves writing code to connect the model to existing systems,
                handle user input, and present the results in a user-friendly
                manner.\n* **Maintenance and Optimization:** AI models are not
                static entities. They require constant monitoring, maintenance,
                and optimization to ensure they remain accurate and effective.
                Coders play a vital role in identifying and addressing
                performance issues, retraining models with new data, and
                adapting them to changing requirements.\n\n**AI Empowers Coding:
                Revolutionizing Development**\n\nThe relationship isn't just
                one-way. AI is also transforming the way coding is done, making
                developers more efficient and productive.\n\n* **Code Completion
                and Suggestion:** AI-powered tools like GitHub Copilot and
                Tabnine analyze code context and suggest code snippets, reducing
                repetitive tasks and accelerating development. These tools learn
                from vast code repositories and can predict what a developer is
                likely to write next, saving significant time and effort.\n*
                **Automated Testing and Debugging:** AI can automate the process
                of testing code and identifying bugs. By analyzing code patterns
                and identifying potential vulnerabilities, AI tools can help
                developers catch errors early and improve code quality.\n*
                **Code Generation:** AI is increasingly capable of generating
                code from natural language descriptions. This allows developers
                to focus on the higher-level aspects of software design and
                leave the more tedious coding tasks to AI.\n* **Personalized
                Learning:** AI can personalize the learning experience for
                aspiring coders by tailoring educational content and providing
                individualized feedback. This can make learning to code more
                effective and engaging.\n\n**The Future: Collaboration and
                Specialization**\n\nThe future of AI and coding is one of
                increasing collaboration and specialization. As AI becomes more
                sophisticated, coders will need to focus on higher-level tasks
                such as designing AI architectures, managing data pipelines, and
                ensuring ethical considerations are addressed.\n\nThe demand for
                skilled professionals who understand both AI and coding is
                rapidly growing. Individuals with this skillset are
                well-positioned to lead the charge in developing innovative
                AI-powered solutions across a wide range of industries.\n\n**In
                conclusion,** AI and coding are not separate entities but rather
                two sides of the same coin. Coding provides the foundation for
                AI, while AI empowers coding, leading to a more efficient and
                innovative development process. Understanding this symbiotic
                relationship is essential for anyone seeking to thrive in the
                rapidly evolving landscape of technology. As AI continues to
                advance, the demand for skilled professionals who can bridge
              </p>
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
