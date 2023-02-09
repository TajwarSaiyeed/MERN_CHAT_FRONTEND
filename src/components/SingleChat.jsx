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

const ENDPOINT = "https://mern-chat-server-vf8j.onrender.com";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    useChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toast = useToast();

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
      socket.emit("join chat", selectedChat?._id);
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
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
  }, [user]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  }, [fetchAgain, messages, notification, setFetchAgain, setNotification]);

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
        socket.emit("new message", data);
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

    if (!socketConnected) return;
    if (!typing) {
      socket.emit("typing", selectedChat?._id);
      setTyping(true);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let now = new Date().getTime();
      let timeDiff = now - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
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
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
              isRequired
              mt={3}
              transition={"all 0.3s ease"}
              onKeyDown={sendMessage}
            >
              {isTyping ? (
                <Text fontSize={"sm"} color={"gray.500"}>
                  {getSender(user, selectedChat?.users)} is typing...
                </Text>
              ) : null}
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
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
              </Box>
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
