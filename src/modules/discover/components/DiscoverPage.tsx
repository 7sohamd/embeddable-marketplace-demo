import { useAppUtils } from "@/lib/app/hooks";
import { Box, Text, Button, HStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Center, Badge } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import CollectionRow from "./CollectionRow";
import Featured from "./Featured";
import { useState } from "react";
import AuctionInfo from "@/modules/auction/AuctionInfo";
import { Flame } from "lucide-react";
import { useGetCw721Tokens } from "@/lib/graphql/hooks/cw721";
import CollectionRowToken from "@/modules/cw721/components/CollectionRowToken";
import { useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import FallbackImage from "@/modules/common/ui/Image/FallbackImage";
import Link from "next/link";
import { LINKS } from "@/utils/links";
import { QuestionIcon } from "@chakra-ui/icons";
import { IAuctionCollection } from "@/lib/app/types";

const BRANDS = [
  { label: "NIKE", desc: "Nike sneaker NFTs" },
  { label: "ADIDAS", desc: "Adidas sneaker NFTs" },
  { label: "PUMA", desc: "Puma sneaker NFTs" },
];

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

interface DiscoverPageProps {}
const DiscoverPage: FC<DiscoverPageProps> = (props) => {
  const {} = props;
  const { getCollections } = useAppUtils();
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const collections = useMemo(() => {
    let all = getCollections();
    if (selectedBrand) {
      // Filter by brand in collection name (case-insensitive)
      all = all.filter(col => col.name.toLowerCase().includes(selectedBrand.toLowerCase()));
    }
    return all;
  }, [getCollections, selectedBrand]);

  const auctionCollection = useMemo(() => getCollections().find(col => col.id === "auction") as IAuctionCollection | undefined, [getCollections]);
  const { data: hotDealTokenIds } = useGetCw721Tokens(auctionCollection?.cw721 || "");
  const hotDealTokenId = hotDealTokenIds && hotDealTokenIds.length > 0 ? hotDealTokenIds[0] : null;
  const hotDealToken = useGetCw721Token(auctionCollection?.cw721 || "", hotDealTokenId || "");

  return (
    <Box mt={12}>
      <Text fontSize="2xl" fontWeight={200} color="white" mb={6} fontFamily="Inter, sans-serif">
        Explore Collections
      </Text>
      <HStack spacing={4} mb={8}>
        <Button
          onClick={() => setSelectedBrand(null)}
          variant={selectedBrand === null ? "solid" : "outline"}
          colorScheme="gray"
          color="white"
          borderRadius="full"
          fontWeight={200}
          fontFamily="Inter, sans-serif"
          px={6}
          py={2}
          _hover={{ bg: "#181818" }}
          bg={selectedBrand === null ? "#222" : "transparent"}
          borderColor="#444"
        >
          All
        </Button>
        {BRANDS.map((brand) => (
          <Button
            key={brand.label}
            onClick={() => setSelectedBrand(selectedBrand === brand.label ? null : brand.label)}
            variant={selectedBrand === brand.label ? "solid" : "outline"}
            colorScheme="gray"
            color="white"
            borderRadius="full"
            fontWeight={200}
            fontFamily="Inter, sans-serif"
            px={6}
            py={2}
            _hover={{ bg: "#181818" }}
            bg={selectedBrand === brand.label ? "#222" : "transparent"}
            borderColor="#444"
          >
            {brand.label}
          </Button>
        ))}
      </HStack>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={8} justifyContent="flex-start">
        {collections.length === 0 ? (
          <Text color="#888" fontWeight={200} fontFamily="Inter, sans-serif">No collections found for this brand.</Text>
        ) : (
          collections.map((col) => (
            <Box key={col.id} mt="10">
              <CollectionRow collectionId={col.id} />
            </Box>
          ))
        )}
      </Box>
      {/* Hot Deals Section */}
      <Center mb={6} mt={20} id="hot-deals">
        <Text fontSize="2xl" fontWeight={200} color="white" fontFamily="Inter, sans-serif" display="flex" alignItems="center" gap={2}>
          <Flame color="orange" width={28} /> Hot Deals
        </Text>
      </Center>
      <Box bg="#111" borderRadius="2xl" p={10} maxW="container.lg" mx="auto" boxShadow="2xl" position="relative">
        {/* HOT tag */}
        <Badge
          position="absolute"
          top={4}
          right={4}
          bgGradient="linear(to-r, orange.400, red.500)"
          color="white"
          px={3}
          py={1}
          borderRadius="full"
          fontWeight={700}
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap={1}
          boxShadow="md"
          zIndex={2}
        >
          <Flame style={{ marginRight: 4 }} width={18} /> HOT
        </Badge>
        {auctionCollection && hotDealTokenId ? (
          <>
            <Box display="flex" justifyContent="center" mb={8}>
              <CollectionRowToken tokenId={hotDealTokenId} collection={auctionCollection as IAuctionCollection} contractAddress={auctionCollection.cw721} />
            </Box>
            <AuctionInfo
              collection={auctionCollection}
              collectionName={auctionCollection.name}
              tokenId={hotDealTokenId}
              name={hotDealToken.data?.metadata?.name || hotDealTokenId}
            />
          </>
        ) : (
          <Text color="#888" fontWeight={200} fontFamily="Inter, sans-serif">No hot deals available right now.</Text>
        )}
      </Box>
      {/* Featured Collectables Section */}
      <Text fontSize="2xl" fontWeight={200} color="white" mt={20} mb={6} fontFamily="Inter, sans-serif" textAlign="center" id="featured">
        Featured Collectables
      </Text>
      <Box bg="#111" borderRadius="2xl" p={10} maxW="container.lg" mx="auto" boxShadow="2xl">
        <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          {/* NIKE Featured */}
          <Box bg="#181818" borderRadius="xl" p={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Link href={LINKS.cw721Token("auction", "NIKE1")}>
              <FallbackImage src="/nike-demo.png" alt="NIKE Shoe" borderRadius="lg" boxSize="160px" mb={4} />
            </Link>
            <Text color="white" fontWeight={200} fontFamily="Inter, sans-serif" fontSize="lg">NIKE Air Max</Text>
          </Box>
          {/* PUMA Featured */}
          <Box bg="#181818" borderRadius="xl" p={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Link href={LINKS.cw721Token("auction", "PUMA1")}>
              <FallbackImage src="/puma-demo.png" alt="PUMA Shoe" borderRadius="lg" boxSize="160px" mb={4} />
            </Link>
            <Text color="white" fontWeight={200} fontFamily="Inter, sans-serif" fontSize="lg">PUMA Suede Classic</Text>
          </Box>
          {/* ADIDAS Featured */}
          <Box bg="#181818" borderRadius="xl" p={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {auctionCollection && hotDealTokenId && (
              <CollectionRowToken tokenId={hotDealTokenId} collection={auctionCollection as IAuctionCollection} contractAddress={auctionCollection.cw721} />
            )}
            <Text color="white" fontWeight={200} fontFamily="Inter, sans-serif" fontSize="lg">ADIDAS SL 72</Text>
          </Box>
        </Box>
      </Box>
      {/* Help/FAQ Section */}
      <Text fontSize="2xl" fontWeight={200} color="white" mt={20} mb={6} fontFamily="Inter, sans-serif" id="help">

      </Text>
      <Center flexDirection="column" mb={12}>
        <Box bg="#181818" borderRadius="full" p={4} mb={4}>
          <QuestionIcon color="#aaa" boxSize={12} />
        </Box>
        <Text color="#bbb" fontWeight={200} fontFamily="Inter, sans-serif" fontSize="lg" textAlign="center" mb={8}>
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
};
export default DiscoverPage;
