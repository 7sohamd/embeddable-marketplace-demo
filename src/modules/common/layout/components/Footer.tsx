import { Flex, Text, Link, Icon, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import useApp from "@/lib/app/hooks/useApp";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";

interface FooterProps {}

const Footer: FC<FooterProps> = (props) => {
  const {} = props;
  const { config } = useApp();

  return (
    <footer>
      <Flex
        backgroundColor="#000"
        direction="column"
        textColor="white"
        align="center"
        p="8"
        borderTop="1px solid #222"
        fontFamily="Inter, sans-serif"
        fontWeight={200}
        fontSize="md"
        letterSpacing={0.5}
        mt={24}
        as="footer"
        data-testid="footer"
      >
        <Text data-testid="footer-text" fontWeight={200}>
          This Website was built by SOHAM.
        </Text>
        <Text mt={2} fontSize="sm" color="#888" fontWeight={200}>
          &copy; {new Date().getFullYear()} Powered by Andromeda. All rights reserved.
        </Text>
        
        <Flex direction="column" align="center" mt={6} gap={1}>
          <Flex gap={4} mt={2}>
            <Link href="mailto:soham4707@gmail.com" color="#bbb" _hover={{ color: '#fff' }} aria-label="Email">
              <EmailIcon boxSize={6} />
            </Link>
            <Link href="tel:+917363977016" color="#bbb" _hover={{ color: '#fff' }} aria-label="Phone">
              <PhoneIcon boxSize={6} />
            </Link>
            <Link href="https://github.com/7sohamd" target="_blank" aria-label="GitHub" color="#bbb" _hover={{ color: '#fff' }}>
              <Box as="span" display="inline-flex" alignItems="center">
                {(FaGithub as any)({ size: 24 })}
              </Box>
            </Link>
            <Link href="https://www.linkedin.com/in/soham-dey-891332256/" target="_blank" aria-label="LinkedIn" color="#bbb" _hover={{ color: '#fff' }}>
              <Box as="span" display="inline-flex" alignItems="center">
                {(FaLinkedin as any)({ size: 24 })}
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </footer>
  );
};

export default Footer;