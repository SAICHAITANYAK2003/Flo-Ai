import { Fullscreen, Download } from "lucide-react";
import Popover from "../components/Popover";
import { useAppContext } from "../context/AppContextProvider";

const ActionButtons = ({ result }) => {
  const { imageDownload } = useAppContext();
  return (
    <div className="flex items-center gap-4">
      <a
        href={result}
        target="_blank"
        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer relative group"
      >
        <Fullscreen />
        <Popover name="Fullscreen" />
      </a>

      <button
        onClick={() => imageDownload(result, "generated-image")}
        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer relative group"
      >
        <Download />
        <Popover name="Download" />
      </button>
    </div>
  );
};

export default ActionButtons;
