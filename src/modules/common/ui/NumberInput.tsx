import {
  Button,
  Flex,
  Input,
  useNumberInput,
  UseNumberInputProps,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface NumberInputProps extends UseNumberInputProps {}
const NumberInput: FC<NumberInputProps> = (props) => {
  const { ...hookProps } = props;
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput(hookProps);

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Flex direction="row" gap="2">
      <Button {...inc} bg="#181818" color="white" _hover={{ bg: "#222" }}>+</Button>
      <Input {...input} bg="#181818" color="white" borderColor="#333" _placeholder={{ color: '#888' }} />
      <Button {...dec} bg="#181818" color="white" _hover={{ bg: "#222" }}>-</Button>
    </Flex>
  );
};
export default NumberInput;
