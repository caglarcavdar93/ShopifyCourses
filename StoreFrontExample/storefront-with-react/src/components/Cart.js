import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Grid,
  Flex,
  Image,
  Text,
  Link,
  Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function Cart() {
  const { isCartOpen, closeCart, checkout, removeLineItems } =
    useContext(ShopContext);

  return (
    <>
      <Drawer
        isOpen={isCartOpen}
        placement="right"
        onClose={closeCart}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            {checkout.lineItems?.length ? (
              checkout.lineItems.map((item) => (
                <Grid templateColumns="repeat(4,1fr)" gap={1} key={item.id}>
                  <Flex alignItems="center" justifyContent="flex-start">
                    <CloseIcon
                      onClick={() => removeLineItems(item.id)}
                      cursor="pointer"
                    />
                  </Flex>
                  <Flex alignItems="center" justifyContent="flex-start">
                    <Image src={item.variant.image.src} />
                  </Flex>
                  <Flex alignItems="center" justifyContent="flex-start">
                    <Text>{item.title}</Text>
                  </Flex>
                  <Flex alignItems="center" justifyContent="flex-start">
                    <Text>{item.variant.price}</Text>
                  </Flex>
                </Grid>
              ))
            ) : (
              <Box h="100%" w="100%">
                <Text
                  display="flex"
                  h="100%"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  Your shopping cart is empty
                </Text>
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter>
            {checkout.lineItems?.length ? (
              <Button colorScheme="blue" w="100%">
                <Link w="100%" href={checkout.webUrl}>
                  Checkout
                </Link>
              </Button>
            ) : null}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
