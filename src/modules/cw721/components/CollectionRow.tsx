import { LINKS } from "@/utils/links";
import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import CollectionRowToken from "./CollectionRowToken";
import { useAppUtils } from "@/lib/app/hooks";
import { useGetCw721Tokens } from "@/lib/graphql/hooks/cw721";
import { IAuctionCollection } from "@/lib/app/types";

interface Cw721CollectionRowProps {
  collectionId: string;
}

const Cw721CollectionRow: FC<Cw721CollectionRowProps> = (props) => {
  const { collectionId } = props;
  const { getCollection } = useAppUtils();
  const collection = getCollection(collectionId) as IAuctionCollection;

  const { data: allTokens } = useGetCw721Tokens(collection.cw721);

  return (
    <Box
      width="300px"
      height="400px"
      m="auto"
      p="8"
      rounded="2xl"
      bg="#181818"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      data-testid="cw721-collection-row"
      position="relative"
    >
      <Flex gap={2} mb={4} justify="center" align="center" width="100%">
        {allTokens?.slice(0, 3).map((tokenId) => (
          <Box key={tokenId} maxW="200px" maxH="200px" display="flex" alignItems="center" justifyContent="center">
            <CollectionRowToken tokenId={tokenId} collection={collection} contractAddress={collection.cw721} />
          </Box>
        ))}
      </Flex>
      <Flex direction="column" align="center" justify="center" flexGrow={1} width="100%">
        <Text fontSize="xl" fontWeight={200} color="white" mb={2} fontFamily="Inter, sans-serif" textAlign="center">
          {collection.name}
        </Text>
        {collection.description && (
          <Text fontSize="sm" fontWeight={200} color="#bbb" mb={4} fontFamily="Inter, sans-serif" textAlign="center">
            {collection.description}
          </Text>
        )}
      </Flex>
      {LINKS.collection(collectionId) && (
        <Link href={LINKS.collection(collectionId)} passHref legacyBehavior>
          <a style={{ display: 'block', maxWidth: '90%', margin: '0 auto', textAlign: 'center', padding: '0.75rem 1rem', background: '#222', color: 'white', borderRadius: '0.75rem', fontWeight: 200, textDecoration: 'none', marginTop: 'auto' }} data-testid="explore-collection-button">
            Explore Collection
          </a>
        </Link>
      )}
    </Box>
  );
};

export default Cw721CollectionRow;
