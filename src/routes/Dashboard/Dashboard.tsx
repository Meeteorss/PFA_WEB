import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BrowserRouter, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const Dashboard = () => {
  const { isAuth, user, loading } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth && !loading) {
      navigate({ pathname: "/" });
    }
  }, [isAuth]);
  return (
    <Flex
      py={12}
      flex={1}
      bgColor={"white"}
      color={"black"}
      justifyContent={"center"}
    >
      <Flex rounded={"lg"} bgColor={"#a7c2bb"} w={"80%"} flexDirection={"row"}>
        <Flex
          roundedLeft={"lg"}
          p={4}
          bgColor={"#7e9e96"}
          w={"20%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Flex flexDirection={"column"}>
            <Link to={"coordinates"}>
              <Box
                my={2}
                fontWeight={"semibold"}
                textAlign={"center"}
                p={2}
                rounded={"lg"}
                bgColor={"#86b5a9"}
                _hover={{ cursor: "pointer", bgColor: "#7ba69b" }}
              >
                My Coordinates
              </Box>
            </Link>

            <Box
              my={2}
              fontWeight={"semibold"}
              textAlign={"center"}
              p={2}
              rounded={"lg"}
              bgColor={"#86b5a9"}
              _hover={{ cursor: "pointer", bgColor: "#7ba69b" }}
            >
              My Account
            </Box>
            <Box
              my={2}
              fontWeight={"semibold"}
              textAlign={"center"}
              p={2}
              rounded={"lg"}
              bgColor={"#86b5a9"}
              _hover={{ cursor: "pointer", bgColor: "#7ba69b" }}
            >
              My Contacts
            </Box>
            <Box
              my={2}
              fontWeight={"semibold"}
              textAlign={"center"}
              p={2}
              rounded={"lg"}
              bgColor={"#86b5a9"}
              _hover={{ cursor: "pointer", bgColor: "#7ba69b" }}
            >
              My Events
            </Box>
          </Flex>
          <Flex alignItems={"center"}>
            <Avatar size={"sm"} bgColor={"black"} name={"Meeteorss"} />
            <Text ml={2} fontWeight={"semibold"}>
              Meeteorss
            </Text>
          </Flex>
        </Flex>
        <Flex w={"80%"}>
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
