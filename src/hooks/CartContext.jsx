import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const updateLocalStorage = (products) => {
    localStorage.setItem("codeburger:cartInfo", JSON.stringify(products));
  };

  const putProductInCart = (product) => {
    const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);
    let newCartProducts = [...cartProducts];

    if (cartIndex >= 0) {
      newCartProducts[cartIndex] = {
        ...newCartProducts[cartIndex],
        quantity: newCartProducts[cartIndex].quantity + 1,
      };
    } else {
      newCartProducts.push({ ...product, quantity: 1 });
    }

    setCartProducts(newCartProducts);
    updateLocalStorage(newCartProducts);
  };

  const deleteProduct = (productId) => {
    const newCart = cartProducts.filter((product) => product.id !== productId);
    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const increaseProductQuantity = (productId) => {
    const newCart = cartProducts.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCartProducts(newCart);
    updateLocalStorage(newCart);
  };

  const decreaseProductQuantity = (productId) => {
    const product = cartProducts.find((p) => p.id === productId);
    if (!product) return;

    if (product.quantity > 1) {
      const newCart = cartProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      );
      setCartProducts(newCart);
      updateLocalStorage(newCart);
    } else {
      deleteProduct(productId);
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    updateLocalStorage([]);
  };

  useEffect(() => {
    const loadUserData = () => {
      const clientCartData = localStorage.getItem("codeburger:cartInfo");
      if (clientCartData) {
        setCartProducts(JSON.parse(clientCartData));
      }
    };
    loadUserData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        putProductInCart,
        clearCart,
        deleteProduct,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used with CartProvider");
  }
  return context;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

