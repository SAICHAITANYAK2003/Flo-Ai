import { createContext, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const value = {
    status,
    navigate,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
