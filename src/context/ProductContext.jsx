import React, { useState, createContext, useContext, useEffect, useMemo } from "react";
import { createProductRequest, getProductsRequest, deleteProductRequest, getProductRequest, updateProductRequest, getAllProductsRequest } from "../api/products";
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export function ProductProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState(null);

  const { isAuthenticated } = useAuth();

  const fetchProducts = async (requestFunction) => {
    try {
      const res = await requestFunction();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Error al obtener productos. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const getProducts = () => fetchProducts(getProductsRequest);
  const getAProducts = () => fetchProducts(getAllProductsRequest);

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      console.log(res);
      setMessage("Producto creado exitosamente.");
    } catch (error) {
      console.error(error);
      setMessage("Error al crear el producto. Por favor, inténtalo de nuevo.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 204)
        setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      await updateProductRequest(id, product);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
    if (!isAuthenticated) {
      setMessage("Debes estar logeado para agregar productos al carrito. Por favor, inicia sesión.");
      return;
    }

    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setMessage(`Se agregó "${product.title}" al carrito.`);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const indexToRemove = prevCart.findIndex((product) => product._id === productId);

      if (indexToRemove !== -1) {
        const updatedCart = [...prevCart];
        updatedCart.splice(indexToRemove, 1);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }

      return prevCart;
    });

    setMessage("Producto eliminado del carrito.");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setMessage("Carrito vaciado exitosamente.");
  };

  useEffect(() => {
    const newTotal = cart.reduce((acc, product) => acc + product.price, 0);
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error(error);
        setMessage("Error al leer el carrito desde el almacenamiento local.");
      }
    }
  }, []);

  return (
    <ProductContext.Provider
      value={useMemo(() => ({
        products,
        cart,
        total,
        message,
        getProducts,
        getAProducts,
        createProduct,
        deleteProduct,
        getProduct,
        updateProduct,
        addToCart,
        removeFromCart,
        clearCart,
      }), [products, cart, total, message, isAuthenticated])}
    >
      {children}
    </ProductContext.Provider>
  );
}
