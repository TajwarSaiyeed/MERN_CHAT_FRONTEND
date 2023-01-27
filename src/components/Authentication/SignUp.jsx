import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SignUp = () => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassord, setConfirmPassord] = useState("");
  const [pic, setPic] = useState("");

  const handleClick = () => setShow(!show);

  const postDetails = (pic) => {};

  return (
    <VStack spacing={`5px`}>
      {/* name */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      {/* email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      {/* password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Your Password"
            type={show ? `text` : `password`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={`4.5rem`}>
            <Button h={`1.75rem`} size={`sm`} onClick={handleClick}>
              {show ? `Hide` : `Show`}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* confirm password */}
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter Confirm Password"
            type={show ? `text` : `password`}
            onChange={(e) => setConfirmPassord(e.target.value)}
          />
          <InputRightElement width={`4.5rem`}>
            <Button h={`1.75rem`} size={`sm`} onClick={handleClick}>
              {show ? `Hide` : `Show`}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* upload image */}
      <FormControl id="pic" isRequired>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type={`file`}
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.value[0])}
        />
      </FormControl>
      {/* submit button */}

      <Button
        type="submit"
        colorScheme="blue"
        size="md"
        w="100%"
        style={{
          marginTop: "15px",
        }}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
