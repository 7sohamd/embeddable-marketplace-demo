"use client";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import PoweredByLogo from "./PoweredByLogo";

interface LayoutProps {
  children?: ReactNode;
}
const NoClientLayout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Box minH="100vh" bg="#101216">
      <Box py="2" px="8">
        <Flex
          direction="row"
          alignItems="center"
          maxW="container.lg"
          mx="auto"
          gap="4"
        >
          <a style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#F5F6FA' }}>Andromeda Embeddables</a>
        </Flex>
      </Box>
      <Divider borderColor="#23272F" />
      <Box px="24" py="16">
        {children}
      </Box>
      <PoweredByLogo />
      {/* <Box>
        <Footer />
      </Box> */}
    </Box>
  );
};
export default NoClientLayout;
