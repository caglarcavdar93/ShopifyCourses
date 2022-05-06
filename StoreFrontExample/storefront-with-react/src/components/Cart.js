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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function Cart() {
  const { isCartOpen, closeCart, checkout, removeLineItems } =
    useContext(ShopContext);

  return (
    <>
      <Drawer isOpen={isCartOpen} placement="right" onClose={closeCart}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            {checkout.lineItems &&
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
              ))}
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue" w="100%">
              <Link w="100%" href={checkout.webUrl}>
                Checkout
              </Link>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Cart;
