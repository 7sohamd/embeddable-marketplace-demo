"use client";

import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Center } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import React from "react";

const FAQS = [
  {
    q: "What is an NFT?",
    a: `NFT stands for "Non-Fungible Token" which represents unique digital items on a blockchain. Unlike cryptocurrencies, each NFT is one-of-a-kind or has limited copies, making them scarce digital assets. On our platform, sports NFTs represent collectible digital memorabilia related to athletes and sports events.`
  },
  {
    q: "How do I connect my wallet?",
    a: `Click the 'Connect Wallet' button in the top right and follow the prompts to link your crypto wallet.`
  },
  {
    q: "How do I purchase an NFT?",
    a: `Browse collections, select an NFT, and click 'Buy' or 'Place Bid'. Confirm the transaction in your wallet.`
  },
  {
    q: "What is Andromeda Protocol?",
    a: `Andromeda Protocol is a platform for building and trading digital assets and smart contracts on Cosmos blockchains.`
  },
  {
    q: "How can I contact support?",
    a: `Reach out via our support email or use the contact form in the footer.`
  },
];

const HelpPage = () => (
  <Box minH="80vh" bg="#111" px={{ base: 4, md: 0 }} py={16}>
    <Center flexDirection="column" mb={12}>
      <Box bg="#181818" borderRadius="full" p={4} mb={4}>
        <QuestionIcon color="#aaa" boxSize={12} />
      </Box>
      <Text fontSize="3xl" fontWeight={200} color="white" fontFamily="Inter, sans-serif" mb={2}>
        Need Help?
      </Text>
      <Text color="#bbb" fontWeight={200} fontFamily="Inter, sans-serif" fontSize="lg" textAlign="center">
        Find answers to frequently asked questions about our Sports NFT Marketplace
      </Text>
    </Center>
    <Box maxW="2xl" mx="auto" bg="#181818" borderRadius="2xl" boxShadow="xl" p={0}>
      <Accordion allowToggle defaultIndex={[0]}>
        {FAQS.map((faq, i) => (
          <AccordionItem key={faq.q} borderColor="#222" _last={{ borderBottomRadius: '2xl' }}>
            <h2>
              <AccordionButton _expanded={{ bg: "#222", color: "white" }} px={6} py={5} fontFamily="Inter, sans-serif" fontWeight={200} fontSize="lg">
                <Box flex="1" textAlign="left">{faq.q}</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px={6} pb={6} color="#bbb" fontFamily="Inter, sans-serif" fontWeight={200} fontSize="md">
              {faq.a}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  </Box>
);

export default HelpPage; 