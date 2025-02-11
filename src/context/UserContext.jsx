import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const [showTransactionModel, setShowTransactionModel] = useState(false);
  const logout = () => {
    setUser({});
    localStorage.removeItem("accessToken");
  };

  const providerObject = {
    user,
    setUser,
    logout,
    showTransactionModel,
    setShowTransactionModel,
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        showTransactionModel,
        setShowTransactionModel,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
