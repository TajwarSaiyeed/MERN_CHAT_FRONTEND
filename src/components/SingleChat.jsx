import React, { useEffect, useState } from "react";
import { useChatState } from "../context/ChatProvider";
import {
  Box,
  ButtonSpinner,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8500";
// eslint-disable-next-line no-unused-vars
let socket, selectedChatCompate;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [user]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat?._id}`,
        config
      );

      setMessages(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage !== "") {
      try {
        setSendMessageLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/message",
          {
            chatId: selectedChat?._id,
            content: newMessage,
          },
          config
        );

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send message",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
        setSendMessageLoading(false);
        setNewMessage("");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // typeing indicator logic
  };

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
                  fetchMessages={fetchMessages}
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
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="black"
                size="xl"
                alignSelf={"center"}
                margin={"auto"}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
              isRequired
              mt={3}
              transition={"all 0.3s ease"}
              onKeyDown={sendMessage}
            >
              <Input
                variant={"filled"}
                placeholder="Enter a message..."
                bg={"#e0e0e0"}
                onChange={typingHandler}
                value={newMessage}
              />
              {sendMessageLoading ? (
                <IconButton>
                  <ButtonSpinner />
                </IconButton>
              ) : null}
            </FormControl>
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
