import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  return (
    <ScrollableFeed>
      {messages
        ? messages.map((m, _) => (
            <div style={{ display: "flex" }} key={m._id}></div>
          ))
        : null}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
