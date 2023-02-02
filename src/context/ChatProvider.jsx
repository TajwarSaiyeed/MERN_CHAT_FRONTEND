import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const CHAT_CONTEXT = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo || userInfo === null) {
      return <Navigate to={"/"} replace />;
    }
  }, []);

  const allData = {
    user,
    setUser,
  };

  return (
    <CHAT_CONTEXT.Provider value={allData}>{children}</CHAT_CONTEXT.Provider>
  );
};

export const useChatState = () => useContext(CHAT_CONTEXT);

export default ChatProvider;
