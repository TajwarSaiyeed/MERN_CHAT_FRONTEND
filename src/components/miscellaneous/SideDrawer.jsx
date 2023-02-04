import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Tooltip,
  Avatar,
  MenuItem,
  useDisclosure,
  Input,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { FaBell } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { useChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState();
  const { user, logOut } = useChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
    }

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
        description: "Failed to Load the search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const accessChat = (id) => {};

  console.log(searchResult, loading);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip label="Search Users to Chat">
          <Button variant={"ghost"} onClick={onOpen}>
            <FcSearch />
            <Text
              display={{
                base: "none",
                md: "flex",
              }}
              px={"4"}
            >
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={`2xl`} fontFamily={`Work sans`} color={`black`}>
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <FaBell
                fontSize={"2xl"}
                style={{
                  marginRight: "10px",
                }}
              />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logOut}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                mr={2}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : searchResult?.length > 0 ? (
              searchResult?.map((user) => (
                <UserListItem
                  key={user?._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
