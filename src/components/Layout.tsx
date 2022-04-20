import { Flex, LightMode } from "@chakra-ui/react";

import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <Flex
      minH={"100vh"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Navbar />
      {children}
      <Flex
        color={"white"}
        alignItems={"center"}
        h={"92px"}
        bgColor={"#292929"}
        pl={"48"}
      >
        Copyright © EZTROLL LTD 2022
      </Flex>
    </Flex>
  );
};
