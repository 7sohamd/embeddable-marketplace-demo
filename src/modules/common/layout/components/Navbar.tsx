import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Box, Text, Icon } from "@chakra-ui/react";
import React, { FC } from "react";
import { CollectionDropdown, ConnectWallet } from "@/modules/common/cta";
import useApp from "@/lib/app/hooks/useApp";
import Link from "next/link";
import { LINKS } from "@/utils/links";
import FlameIcon from "@/modules/common/icons/FlameIcon";
import AlertCircleIcon from "@/modules/common/icons/AlertCircleIcon";
import ChevronDownIcon from "@/modules/common/icons/ChevronDownIcon";
import { useCallback } from "react";

interface NavbarProps {}
const Navbar: FC<NavbarProps> = (props) => {
  const {} = props;
  const { config } = useApp();

  const scrollToSection = useCallback((id: string) => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <Box py="2" px="8" position="sticky" top={0} zIndex={100} bg="#000" borderBottom="1px solid #181818">
      <Flex
        direction="row"
        alignItems="center"
        maxW="container.lg"
        mx="auto"
        gap="4"
      >
        {LINKS.home() && (
          <Link href="/" passHref legacyBehavior>
            <a style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: '1.125rem' }}>SneakSale</a>
        </Link>
        )}
        {/* New nav buttons */}
        <Flex direction="row" alignItems="center" gap="2" ml={8}>
          {/* Explore Dropdown */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon boxSize={4} />} variant="ghost" color="white" fontWeight={200} px={3} py={2} minW="auto" borderRadius="lg" _hover={{ bg: "#181818" }} onClick={() => scrollToSection('explore')}>
              Explore
            </MenuButton>
            <MenuList bg="#111" borderColor="#222" color="white" fontWeight={200}>
              <MenuItem bg="transparent" _hover={{ bg: "#222" }}>
                <Box>
                  <Text fontWeight={200}>All</Text>
                  <Text fontSize="xs" color="#aaa">Browse all collections</Text>
                </Box>
              </MenuItem>
              <MenuItem bg="transparent" _hover={{ bg: "#222" }}>
                <Box>
                  <Text fontWeight={200}>NIKE</Text>
                  <Text fontSize="xs" color="#aaa">Nike sneaker NFTs</Text>
                </Box>
              </MenuItem>
              <MenuItem bg="transparent" _hover={{ bg: "#222" }}>
                <Box>
                  <Text fontWeight={200}>ADIDAS</Text>
                  <Text fontSize="xs" color="#aaa">Adidas sneaker NFTs</Text>
                </Box>
              </MenuItem>
              <MenuItem bg="transparent" _hover={{ bg: "#222" }}>
                <Box>
                  <Text fontWeight={200}>PUMA</Text>
                  <Text fontSize="xs" color="#aaa">Puma sneaker NFTs</Text>
                </Box>
              </MenuItem>
            </MenuList>
          </Menu>
          {/* Featured Button */}
          <Button
            variant="ghost"
            color="white"
            fontWeight={200}
            px={3}
            py={2}
            minW="auto"
            borderRadius="lg"
            _hover={{ bg: "#181818" }}
            onClick={() => scrollToSection('featured')}
          >
            Featured
          </Button>
          {/* Hot Deals Button */}
          <Button
            variant="ghost"
            color="white"
            fontWeight={200}
            px={3}
            py={2}
            minW="auto"
            borderRadius="lg"
            leftIcon={<FlameIcon boxSize={5} />}
            _hover={{ bg: "#181818" }}
            onClick={() => scrollToSection('hot-deals')}
          >
            Hot Deals
          </Button>
          {/* Help Button */}
          <Button
            variant="ghost"
            color="white"
            fontWeight={200}
            px={3}
            py={2}
            minW="auto"
            borderRadius="lg"
            leftIcon={<AlertCircleIcon boxSize={5} />}
            _hover={{ bg: "#181818" }}
            onClick={() => scrollToSection('help')}
          >
            Help
          </Button>
        </Flex>
        <Flex direction="row" ml="auto" gap="2">
          <CollectionDropdown />
          <ConnectWallet />
        </Flex>
      </Flex>
    </Box>
  );
};
export default Navbar;
