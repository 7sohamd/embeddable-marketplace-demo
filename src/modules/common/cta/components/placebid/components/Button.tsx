import usePlaceBidModal from "@/modules/modals/hooks/usePlaceBidModal";
import { Button, ButtonProps } from "@chakra-ui/react";
import React, { FC } from "react";

interface IButtonProps extends ButtonProps {
  auctionAddress: string;
  contractAddress: string;
  tokenId: string;
}

const PlaceBidButton: FC<IButtonProps> = (props) => {
  const { auctionAddress, contractAddress, tokenId, children, ...buttonProps } = props;

  const open = usePlaceBidModal({ contractAddress, auctionAddress, tokenId });

  return (
    <Button onClick={open} w="full" variant="solid" bg="#000" color="white" _hover={{ bg: "#181818" }} {...buttonProps}>
      {children}
    </Button>
  );
};
export default PlaceBidButton;
