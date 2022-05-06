import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Box, Icon, Image, Text, Flex } from "@chakra-ui/react";
import { MdMenu, MdShoppingBasket } from "react-icons/md";
function NavBar() {
  const { openCart, openMenu, checkout } = useContext(ShopContext);

  return (
    <Box>
      <Flex
        backgroundColor="#FFA8E2"
        flexDir="row"
        justifyContent="space-around"
        p="2rem"
      >
        <Icon fill="white" cursor="pointer" as={MdMenu} w={30} h={30} />
        <Image
          src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Logologo_1.svg?v=1610055540"
          w={100}
          h={100}
        />
        <Icon
          fill="white"
          cursor="pointer"
          as={MdShoppingBasket}
          w={30}
          h={30}
          onClick={() => {
            openCart();
          }}
        />
      </Flex>
    </Box>
  );
}

export default NavBar;
