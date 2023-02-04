import React from "react";
import { useChatState } from "../context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useChatState();

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"100%"}
            fontFamily={"Work sans"}
            pb={3}
            px={2}
            fontSize={{
              base: "28px",
              md: "30px",
            }}
          >
            <IconButton
              display={{
                base: "flex",
                md: "none",
              }}
              icon={<IoArrowBackOutline />}
              onClick={() => setSelectedChat(null)}
            />
            {!selectedChat?.isGroupChat ? (
              <Box display={"flex"} justifyContent={"space-between"} w="100%">
                {getSender(user, selectedChat?.users).toUpperCase()}
                <ProfileModal user={getSenderFull(user, selectedChat?.users)} />
              </Box>
            ) : (
              <Box display={"flex"} justifyContent={"space-between"} w="100%">
                {selectedChat?.chatName?.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </Box>
            )}
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            w={"100%"}
            h={"100%"}
            p={3}
            bg="#E8E8E8"
            borderRadius={"lg"}
            overflowY={"auto"}
          >
            <Text>Messages</Text>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>
            Select a chat to start messaging
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
