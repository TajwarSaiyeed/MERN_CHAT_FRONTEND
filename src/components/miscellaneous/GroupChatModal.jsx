import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import axios from "axios";
import UserListItem from "./../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user, chats, setChats } = useChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query || query.length < 1) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  console.log(selectedUsers);

  const handleDelete = (userToDelete) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== userToDelete));
  };

  const handleSubmit = () => {};

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setSelectedUsers([]);
              setSearchResult([]);
            }}
          />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: abdul karim, abdullah"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* selected users */}
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
              {selectedUsers?.map((usr) => (
                <UserBadgeItem
                  user={usr}
                  key={usr._id}
                  handleFunction={() => handleDelete(usr)}
                />
              ))}
            </Box>
            {loading ? (
              <Text>Searching...</Text>
            ) : (
              searchResult
                ?.slice(0, 4)
                ?.map((usr) => (
                  <UserListItem
                    user={usr}
                    handleFunction={() => handleGroup(usr)}
                    key={usr._id}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
