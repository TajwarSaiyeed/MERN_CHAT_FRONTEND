import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { useChatState } from "./../context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = useChatState();
  return (
    <ScrollableFeed>
      {messages
        ? messages.map((m, i) => (
            <div style={{ display: "flex", gap: 2 }} key={m?._id}>
              {isSameSender(messages, m, i, user?._id) ||
              isLastMessage(messages, i, user?._id) ? (
                <Tooltip
                  label={m?.sender?.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    size="sm"
                    src={m?.sender?.pic}
                    mt={"7px"}
                    mr={1}
                    cursor={"pointer"}
                    name={m?.sender?.name}
                  />
                </Tooltip>
              ) : (
                ""
              )}
              <span
                style={{
                  backgroundColor:
                    m?.sender?._id === user?._id ? "#BEE3F8" : "#B9F5D0",
                  padding: "5px 15px",
                  borderRadius: "7px",
                  maxWidth: "75%",
                  marginTop: isSameUser(messages, m, i, user?._id) ? 3 : 10,
                  marginLeft: isSameSenderMargin(messages, m, i, user?._id),
                }}
              >
                {m === undefined ? "" : m?.content}
              </span>
            </div>
          ))
        : null}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
