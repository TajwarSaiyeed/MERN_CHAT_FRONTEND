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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { FaBell } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { useChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = useChatState();

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
          <Button variant={"ghost"}>
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
              <ProfileModal>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
