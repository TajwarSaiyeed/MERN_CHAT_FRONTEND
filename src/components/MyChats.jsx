import React, { useState, useEffect } from "react";
import { useChatState } from "../context/ChatProvider";
import { Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } =
    useChatState();
  const toast = useToast();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display={{
        base: selectedChat ? "none" : "flex",
        md: "flex",
      }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{
        base: "100%",
        md: "31%",
      }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{
          base: "28px",
          md: "30px",
        }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{
              base: "17px",
              md: "10px",
              lg: "17px",
            }}
            rightIcon={<MdAdd />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg="#F8F8F8"
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats?.map((chat) => (
              <Box
                key={chat._id}
                px={3}
                py={2}
                cursor={"pointer"}
                borderRadius={"lg"}
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                onClick={() => setSelectedChat(chat)}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
