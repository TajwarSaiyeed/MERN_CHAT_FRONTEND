import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const HomePage = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) <Navigate to={`/chats`} replace />;
  }, []);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={`4xl`} fontFamily={`Work sans`} color={`black`}>
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg={`white`}
        p={4}
        borderRadius={`lg`}
        borderWidth={`1px`}
        w={`100%`}
        color={`black`}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={`1em`}>
            <Tab width={`50%`}>Login</Tab>
            <Tab width={`50%`}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
