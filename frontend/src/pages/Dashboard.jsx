import { Sparkles, BadgeInfo } from "lucide-react";
import CreationItem from "../components/CreationItem";
import { useAppContext } from "../context/AppContextProvider";

const Dashboard = () => {
  const { userCreations, userDetails } = useAppContext();
  const { userPlan } = userDetails;

  return (
    <div className="h-full">
      {/* Info Cards */}
      <div className="flex flex-col sm:flex-row items-center gap-6 ">
        {/*Total Creation  Cards */}
        <div className="flex items-center justify-between bg-white border border-gray-300 px-4 py-4 w-72 rounded-md">
          <div className="flex flex-col space-y-2">
            <p className="text-secondary">Total Creations</p>
            <p className="text-lg">{userCreations.length}</p>
          </div>
          <span className="bg-gradient-to-r from-[#3588F2] to-[#0BB0D7] p-2.5 rounded-2xl text-white">
            <Sparkles />
          </span>
        </div>

        {/* Plan Status */}

        <div className="flex items-center justify-between bg-white border border-gray-300 px-4 py-4 w-72 rounded-md">
          <div className="flex flex-col space-y-2">
            <p className="text-secondary">Plan Status</p>
            <p className="text-lg">{userPlan}</p>
          </div>
          <span className="bg-gradient-to-r from-[#FF61C5] to-[#9E53EE] p-2.5 rounded-2xl text-white">
            <BadgeInfo />
          </span>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="mt-15   ">
        <h1 className="text-2xl">Recent Creations</h1>
        <div className="mt-10 flex flex-col gap-4">
          {userCreations.map((item, index) => (
            <CreationItem item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
