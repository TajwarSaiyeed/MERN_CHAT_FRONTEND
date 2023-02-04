import React from "react";
import { Box } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={"lg"}
      m={1}
      mb={2}
      varient={"solid"}
      fontSize={12}
      color={"white"}
      cursor={"pointer"}
      onClick={handleFunction}
      display={"flex"}
      bg={"blue.300"}
      alignItems={"center"}
    >
      {user.name}
      <MdClose
        style={{
          paddingLeft: 5,
        }}
        fontSize={20}
      />
    </Box>
  );
};

export default UserBadgeItem;
