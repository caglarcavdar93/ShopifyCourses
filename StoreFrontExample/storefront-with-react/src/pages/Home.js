import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import Hero from "../components/Hero";
import ImageWithText from "../components/ImageWithText";
function Home() {
  const { fetchAllProducts, products } = useContext(ShopContext);
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (!products) return <div>Loading...</div>;

  return (
    <Box>
      <Hero />
      <Grid templateColumns="repeat(3,1fr)">
        {products.map((product) => {
          return (
            <Link to={`/products/${product.handle}`} key={product.title}>
              <Box
                _hover={{ opacity: "80%" }}
                textAlign="center"
                position="relative"
              >
                <Image src={product.images[0].src} />
                <Text
                  position="absolute"
                  bottom="15%"
                  w="100%"
                  fontWeight="bold"
                >
                  {product.title}
                </Text>
                <Text position="absolute" bottom="5%" w="100%" color="gray.500">
                  {product.variants[0].price}
                </Text>
              </Box>
            </Link>
          );
        })}
      </Grid>
      <ImageWithText
        image="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/premium-bath-bombs.jpg?v=1610066758"
        heading="Heading"
        text="I'm baby kale chips twee skateboard tattooed, DIY iPhone ugh mixtape tumeric unicorn narwhal. Iceland shoreditch authentic, sartorial vegan twee flannel banh mi bushwick retro farm-to-table single-origin coffee. "
      />
      <ImageWithText
        reverse
        image="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/bath-bomb-and-candle.jpg?v=1610066758"
        heading="Another Heading"
        text="I'm baby kale chips twee skateboard tattooed, DIY iPhone ugh mixtape tumeric unicorn narwhal. Iceland shoreditch authentic, sartorial vegan twee flannel banh mi bushwick retro farm-to-table single-origin coffee. "
      />
    </Box>
  );
}

export default Home;
