import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      toast({
        title: "Login Successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats", { replace: true });
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <VStack spacing={`5px`}>
      {/* email */}
      <FormControl id="loginEmail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      {/* password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
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
        isLoading={loading}
        style={{
          marginTop: "15px",
        }}
        onClick={submitHandler}
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
