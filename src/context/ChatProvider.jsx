import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CHAT_CONTEXT = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo || userInfo === null) {
      return navigate("/", { replace: true });
    }
  }, [navigate]);

  const logOut = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/", { replace: true });
  };

  const allData = {
    logOut,
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetchAgain,
    setFetchAgain,
    notification,
    setNotification,
  };

  return (
    <CHAT_CONTEXT.Provider value={allData}>{children}</CHAT_CONTEXT.Provider>
  );
};

export const useChatState = () => useContext(CHAT_CONTEXT);

export default ChatProvider;
