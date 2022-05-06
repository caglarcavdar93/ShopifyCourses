import React, { Component } from "react";
import Client from "shopify-buy";
const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

export class ShopProvider extends Component {
  state = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  };
  componentDidMount() {
    if (localStorage.checkout_id) this.fetchCheckout(localStorage.checkout_id);
    else this.createCheckout();
  }

  createCheckout = async () => {
    try {
      debugger;
      console.log(client);
      const checkout = await client.checkout.create();
      localStorage.setItem("checkout_id", checkout.id);
      this.setState({ checkout });
    } catch (error) {
      console.log(error);
    }
  };
  fetchCheckout = async (checkoutId) => {
    client.checkout
      .fetch(checkoutId)
      .then((checkout) => this.setState({ checkout }));
  };

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = {
      variantId,
      quantity: parseInt(quantity),
    };
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout });
    this.openCart();
  };

  fetchAllProducts = async () => {
    const products = await client.product.fetchAll();
    this.setState({ products });
  };
  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product });
  };
  removeLineItems = async (lineItemIdsToRemove) => {
    const checkout = await client.checkout.removeLineItems(
      this.state.checkout.id,
      lineItemIdsToRemove
    );
    this.setState({ checkout });
  };
  openCart = () => {
    this.setState({ isCartOpen: true });
  };
  closeCart = () => {
    this.setState({ isCartOpen: false });
  };
  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };
  openMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
          removeLineItems: this.removeLineItems,
          addItemToCheckout: this.addItemToCheckout,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
