"use client";
import { APP_ENV } from "@/appEnv";
import { Layout } from "@/modules/common/layout";
import { DiscoverPage } from "@/modules/discover";
import { KEPLR_AUTOCONNECT_KEY, connectAndromedaClient, initiateKeplr, useAndromedaStore } from "@/zustand/andromeda";
import { updateConfig } from "@/zustand/app";
import React, { FC, useEffect, useState } from "react"
import Footer from "@/modules/common/layout/components/Footer";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { cn } from "../../../lib/utils";

interface Props {
}

console.log("DefaultApp loaded");

const HeroSection = () => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    minH="60vh"
    py={16}
    px={4}
    textAlign="center"
    style={{
      backgroundSize: "40px 40px",
      backgroundImage:
        "linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Faded edge overlay */}
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        background: "black",
        maskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)",
      }}
    />
    <Heading
      as="h1"
      fontSize={{ base: "5xl", md: "8xl" }}
      fontWeight={300}
      color="transparent"
      mb={0.1}
      fontFamily="Inter, sans-serif"
      sx={{
        background: "linear-gradient(90deg, #444 0%, #fff 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      SNEAKSALE
    </Heading>
    <Text fontSize={{ base: "lg", md: "1xl" }} color="white" maxW="2xl" mb={8} fontWeight={100} fontFamily="Inter, sans-serif">
      Discover, buy, and resell sneakers on a modern, minimal, and secure platform. Connect your wallet and start exploring collections from the community.
    </Text>
    <Button
      as="a"
      href="#explore"
      size="lg"
      bg="#222"
      color="white"
      borderRadius="full"
      px={8}
      py={6}
      _hover={{ bg: "#333" }}
      fontWeight={200}
    >
      Explore Collections
    </Button>
  </Flex>
);

const GridBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="relative flex w-full items-center justify-center bg-black"
    style={{ minHeight: '50rem' }}
  >
    <div
      className="absolute inset-0"
      style={{
        backgroundSize: "40px 40px",
        backgroundImage:
          "linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)",
      }}
    />
    {/* Radial gradient for the container to give a faded look */}
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    ></div>
    <div className="h-40 w-full bg-red-500" />
    <div className="relative z-20 w-full">{children}</div>
  </div>
);

const DefaultApp: FC<Props> = (props) => {
    const { } = props;
    const isConnected = useAndromedaStore(state => state.isConnected)
    const chainId = useAndromedaStore(state => state.chainId)
    const isLoading = useAndromedaStore(state => state.isLoading)
    const keplr = useAndromedaStore(state => state.keplr)

    const [autoconnect, setAutoconnect] = useState<string | null>(null);

    useEffect(() => {
        initiateKeplr();
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAutoconnect(localStorage.getItem(KEPLR_AUTOCONNECT_KEY));
        }
    }, []);

    useEffect(() => {
        if (!isLoading && typeof keplr !== "undefined" && autoconnect === keplr?.mode) {
            if (!isConnected || (isConnected && chainId !== APP_ENV.DEFAULT_CONFIG.chainId)) {
                connectAndromedaClient(APP_ENV.DEFAULT_CONFIG.chainId);
            }
        }
    }, [keplr, isConnected, isLoading, chainId, autoconnect]);

    useEffect(() => {
        updateConfig(APP_ENV.DEFAULT_CONFIG);
    }, [])

    return (
        <Layout>
            <GridBackground>
              <HeroSection />
            </GridBackground>
            <Box id="explore" mt={4}>
              <DiscoverPage />
            </Box>
            <Footer />
        </Layout>
    )
}

export default DefaultApp