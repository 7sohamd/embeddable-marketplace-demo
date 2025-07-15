import { createLocalStorageManager, extendTheme, theme, ThemeConfig } from "@chakra-ui/react";

import Accordion from "./accordion";
import Button from "./button";
import Heading from "./heading";
import Input from "./input";
import Menu from "./menu";
import Modal from "./modal";
import Popover from "./popover";
import Spinner from "./spinner";
import Tabs from "./tabs";
import Tooltip from "./tooltip";

import shadows from "./shadows";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const ThemeStorageManager = createLocalStorageManager("andromeda-marketplace-theme");

export default extendTheme({
  config,
  styles: {
    global: {
      'html, body': {
        bg: '#000',
        color: '#fff',
      },
      '*': {
        scrollbarWidth: '6px',
        scrollbarColor: '#333 transparent',
      },
      '*::-webkit-scrollbar': {
        width: '6px',
      },
      '*::-webkit-scrollbar-track': {
        bg: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: '#333',
        borderRadius: '1.5rem',
      },
    },
  },
  shadows,
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'Menlo, monospace',
  },
  components: {
    Accordion,
    Button,
    Heading,
    Input,
    Modal,
    Popover,
    Spinner,
    Tabs,
    Tooltip,
  },
  colors: {
    primary: {
      500: '#fff', // white for text/icons on black
      600: '#333',    // dark grey for buttons/accents
    },
    gray: {
      50: '#222',
      100: '#333',
      200: '#444',
      300: '#555',
      400: '#666',
      500: '#888',
      600: '#aaa',
      700: '#ccc',
      800: '#eee',
      900: '#fff',
    },
    black: '#000',
    white: '#fff',
    error: theme.colors.red,
    warning: theme.colors.yellow,
    success: theme.colors.green,
    system: theme.colors.gray,
  },
  textStyles: {
    h1: {
      fontWeight: 300,
      color: 'white',
      fontSize: 'xl',
      mb: 2,
      letterSpacing: 0.5,
    },
    bold: {
      color: 'white',
      fontWeight: 300,
    },
    light: {
      color: 'white',
      fontWeight: 200,
      fontSize: 'sm',
    },
  },
});
