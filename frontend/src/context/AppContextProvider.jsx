import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const AppContext = createContext();

//URL'S Configuration
const nodeEnv = import.meta.env.NODE_ENV;
const backendUrl =
  nodeEnv === "production"
    ? import.meta.env.VITE_BACKEND_PRODUC_URL
    : import.meta.env.VITE_BACKEND_DEV_URL;

export const AppContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState("");
  const [userCreations, setUserCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");

  let token;

  const { getToken } = useAuth();

  //Fetch User Credits
  const fetchUserCredits = async () => {
    try {
      token = await getToken();
      const { data } = await axios.get(`${backendUrl}/user/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ API response received:", data);
      if (data.success) {
        setUserDetails(data.data);
        console.log(data);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error("❌ Axios request failed:", error);
    }
  };

  //Fetch User Creations
  const fetchUserCreations = async (token) => {
    try {
      token = await getToken();
      const { data } = await axios.get(`${backendUrl}/user/recent-creations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserCreations(data.data);
        console.log(data);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Generate Article

  const writeArticleFun = async ({ input, length }) => {
    try {
      token = await getToken();

      const prompt = `Write an article about ${input} in ${length}`;

      const { data } = await axios.post(
        `${backendUrl}/ai/generate-article`,
        {
          prompt,
          length,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //Generate Blog Titles

  const blogTitlesFun = async ({ input, category }) => {
    try {
      token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/ai/generate-blog-titles`,
        {
          prompt: input,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //Generate Image
  const genImageFun = async ({ input, style }) => {
    try {
      token = await getToken();

      const prompt = `Create an image of ${input} in ${style}.`;

      console.log(prompt);

      const { data } = await axios.post(
        `${backendUrl}/ai/generate-image`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  //Remove BG

  const removeBgFun = async (formData) => {
    try {
      token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/ai/remove-background`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  // Object removal
  const removeObjectFun = async (formData) => {
    try {
      token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/ai/object-removal`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  //Resume Review
  const resumeReviewFun = async (formData) => {
    try {
      token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/ai/resume-review`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserCredits();
    fetchUserCreations();
  }, []);

  const value = {
    status,
    navigate,
    backendUrl,
    userDetails,
    userCreations,
    loading,
    setLoading,
    writeArticleFun,
    blogTitlesFun,
    genImageFun,
    removeBgFun,
    removeObjectFun,
    resumeReviewFun,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
