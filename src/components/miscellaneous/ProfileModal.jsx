import { useDisclosure, IconButton } from "@chakra-ui/react";
import React from "react";
import { AiFillEye } from "react-icons/ai";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={"flex"}>
          <AiFillEye onClick={onOpen} />
        </IconButton>
      )}
    </>
  );
};

export default ProfileModal;
