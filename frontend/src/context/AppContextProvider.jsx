import { useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const AppContext = createContext();

//URL'S Configuration
const nodeEnv = import.meta.env.NODE_ENV;
const backendUrl =
  nodeEnv === "production"
    ? import.meta.env.VITE_BACKEND_PRODUC_URL
    : import.meta.env.VITE_BACKEND_DEV_URL;

export const AppContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [userCreations, setUserCreations] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const { getToken } = useAuth();

  //Fetch User Credits
  const fetchUserCredits = async (token) => {
    const { data } = await axios.get(`${backendUrl}/user/credits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ API response received:", data);
    if (data.success) {
      setUserDetails(data.data);
      console.log(data.data);
    } else {
      toast.error(data.message);
      console.log(data.message);
    }
  };

  //Fetch User Creations
  const fetchUserCreations = async (token) => {
    const { data } = await axios.get(`${backendUrl}/user/recent-creations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setUserCreations(data.data);
    } else {
      toast.error(data.message);
      console.log(data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      console.log("🔐 Clerk Token:", token);
      if (!token) {
        console.error("⚠️ Token is missing");
        return;
      }

      setUserToken(token); // still storing in state for later access if needed
      await fetchUserCredits(token);
      await fetchUserCreations(token);
    };

    fetchData();
  }, [getToken]);

  const value = {
    status,
    navigate,
    backendUrl,
    token: userToken,
    userDetails,
    userCreations,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
