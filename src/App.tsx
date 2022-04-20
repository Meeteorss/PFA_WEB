import React from "react";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";
import { Layout } from "./components/Layout";
import theme from "./theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        <Layout>
          <Outlet />
        </Layout>
      </DarkMode>
    </ChakraProvider>
  );
};
