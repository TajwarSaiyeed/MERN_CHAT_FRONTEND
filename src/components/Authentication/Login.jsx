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

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => setShow(!show);
  return (
    <VStack spacing={`5px`}>
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

      <Button
        type="submit"
        colorScheme="blue"
        size="md"
        w="100%"
        style={{
          marginTop: "15px",
        }}
      >
        Login
      </Button>
      <Button
        type="submit"
        variant={`solid`}
        colorScheme="red"
        size="md"
        w="100%"
        style={{
          marginTop: "15px",
        }}
        onClick={() => {
          setEmail(`guest@example.com`);
          setPassword(`123456`);
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
