import React, { createContext } from "react";

const CHAT_CONTEXT = createContext();

const ChatProvider = ({ children }) => {
  return (
    <CHAT_CONTEXT.Provider value="hello">{children}</CHAT_CONTEXT.Provider>
  );
};

export default ChatProvider;
