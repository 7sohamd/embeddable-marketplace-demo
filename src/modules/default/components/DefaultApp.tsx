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
    minH="50vh"
    pt={0}
    pb={0}
    px={4}
    textAlign="center"
    position="relative"
    style={{
      backgroundSize: "40px 40px",
      backgroundImage:
        "linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)",
      overflow: "hidden",
    }}
  >
    {/* Dark radial overlay to fade and darken grid edges */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.85) 100%)"
      }}
    />
    {/* Faded edge overlay */}
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        background: "black",
        maskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black 100%)",
        zIndex: 0,
      }}
    />
    {/* Black radial gradient behind text */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw",
        height: "30vh",
        maxWidth: "1200px",
        maxHeight: "600px",
        zIndex: 2,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.15) 85%, transparent 100%)"
      }}
    />
    <Heading
      as="h1"
      fontSize={{ base: "5xl", md: "8xl" }}
      fontWeight={300}
      color="transparent"
      mb={0.1}
      fontFamily="Inter, sans-serif"
      zIndex={3}
      sx={{
        background: "linear-gradient(90deg, #222 0%, #666 25%, #fff 50%, #666 75%, #222 100%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "0% 50%",
        animation: "moveGradient 30s linear infinite, fadeInBlur 1.2s cubic-bezier(0.4,0,0.2,1) 0.1s both",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        opacity: 0,
        filter: "blur(8px)",
        '@keyframes moveGradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' }
        },
        '@keyframes fadeInBlur': {
          '0%': { opacity: 0, filter: 'blur(16px)' },
          '60%': { opacity: 1, filter: 'blur(4px)' },
          '100%': { opacity: 1, filter: 'blur(0px)' }
        }
      }}
    >
      SNEAKSALE
    </Heading>
    <Text fontSize={{ base: "lg", md: "1xl" }} color="white" maxW="2xl" mb={8} fontWeight={100} fontFamily="Inter, sans-serif" zIndex={3}>
      <TypewriterText text="Discover, buy, and resell sneakers on a modern, minimal, and secure platform. Connect your wallet and start exploring collections from the community." speed={35} />
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
      zIndex={3}
    >
      Explore Collections
    </Button>
  </Flex>
);

const GridBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="relative flex w-full items-center justify-center bg-black"
    style={{ minHeight: '0' }}
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
    <div className="relative z-20 w-full">{children}</div>
  </div>
);

// TypewriterText component for typewriter animation
interface TypewriterTextProps {
  text: string;
  speed?: number;
}

const TypewriterText = ({ text, speed = 35 }: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayed}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </span>
  );
};

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
            <Box id="explore" mt={60}>
            <DiscoverPage />
            </Box>
            <Footer />
        </Layout>
    )
}

export default DefaultApp