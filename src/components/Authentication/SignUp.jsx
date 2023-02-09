import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassord, setConfirmPassord] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "MERN_CHAT_APP");
      data.append("cloud_name", "tajwarsaiyeed");
      fetch(" https://api.cloudinary.com/v1_1/tajwarsaiyeed/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassord) {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    } else if (password !== confirmPassord) {
      toast({
        title: "Password and Confirm Password must be same!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "https://mern-chat-server-vf8j.onrender.com/api/user",
          {
            name,
            email,
            password,
            pic,
          },
          config
        );

        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/chats", { replace: true });
      } catch (err) {
        toast({
          title: "Registration Failed",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

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
      <FormControl id="signupPassword" isRequired>
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
          onChange={(e) => postDetails(e.target.files[0])}
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
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
