import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const CHAT_CONTEXT = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo);

    if (!userInfo || userInfo === null) {
      return <Navigate to={"/"} />;
    }
    setUser(user);
  }, [user]);

  const allData = {
    user,
    setUser,
  };

  return (
    <CHAT_CONTEXT.Provider value={allData}>{children}</CHAT_CONTEXT.Provider>
  );
};

export const ChatState = () => useContext(CHAT_CONTEXT);

export default ChatProvider;
