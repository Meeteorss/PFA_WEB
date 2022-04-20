import { Flex } from "@chakra-ui/react";
import React from "react";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <Flex bgColor={"white"} flex={1} flexDirection={"column"} color={"black"}>
      <Hero />
      <Flex>Features</Flex>
    </Flex>
  );
};

export default Home;
