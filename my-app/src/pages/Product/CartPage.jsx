import React, { useState, useEffect } from 'react';
import {
  Box, Button, Heading, VStack, HStack, Text, Divider, IconButton, Image,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart2')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart
      .map(product => product._id === productToRemove._id
        ? { ...product, quantity: product.quantity - 1 }
        : product)
      .filter(product => product.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem('cart2', JSON.stringify(updatedCart));
  };

  const addToCart = (productToUpdate) => {
    const updatedCart = cart.map(product =>
      product._id === productToUpdate._id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );

    setCart(updatedCart);
    localStorage.setItem('cart2', JSON.stringify(updatedCart));
  };

  const deleteFromCart = (productToDelete) => {
    const updatedCart = cart.filter(product => product._id !== productToDelete._id);
    setCart(updatedCart);
    localStorage.setItem('cart2', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    const amount = calculateTotal();

    const options = {
      key: "rzp_test_PuIvwrP2D7FLip", // Your Razorpay test key
      amount: amount * 100, // in paise
      currency: "INR",
      name: "Green Paradise",
      description: "Payment for your order",
      image: "/logo.png", // optional logo
      handler: function (response) {
        const currentTime = new Date().toLocaleString();

        const orderedItems = cart.map(product => ({
          ...product,
          orderedAt: currentTime,
        }));

        localStorage.setItem('ordered', JSON.stringify(orderedItems));
        localStorage.removeItem('cart2');
        setCart([]);

        // alert("Payment Successful! Order placed.");
        window.location.href = "/"; // optional redirect
      },
      prefill: {
        name: "",
        email: "john@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#0a2e1a",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Box maxW="container.md" mx="auto" p={4}>
      <Heading mb={4}>Shopping Cart</Heading>

      {cart.length === 0 ? (
        <Text fontSize="lg" color="gray.500">Your cart is empty.</Text>
      ) : (
        <>
          <VStack spacing={4} align="stretch">
            {cart.map(product => (
              <Box
                key={product._id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                shadow="sm"
                bg="gray.50"
              >
                <HStack spacing={4}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Box flex="1">
                    <HStack justify="space-between">
                      <Text fontSize="lg" fontWeight="bold">{product.name}</Text>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="ghost"
                        aria-label="Remove item"
                        onClick={() => deleteFromCart(product)}
                      />
                    </HStack>
                    <Text mt={2}>Price: ₹{product.price.toFixed(2)}</Text>
                    <HStack mt={2} align="center">
                      <IconButton
                        icon={<MinusIcon />}
                        onClick={() => removeFromCart(product)}
                        aria-label="Decrease quantity"
                        size="sm"
                      />
                      <Text fontWeight="bold">{product.quantity}</Text>
                      <IconButton
                        icon={<AddIcon />}
                        onClick={() => addToCart(product)}
                        aria-label="Increase quantity"
                        size="sm"
                      />
                    </HStack>
                    <Text mt={2} fontSize="sm" color="gray.600">
                      Total: ₹{(product.price * product.quantity).toFixed(2)}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>

          <Box mt={8} p={6} bg="gray.50" borderRadius="md" shadow="md">
            <Heading size="md" mb={4}>Order Summary</Heading>
            <HStack justify="space-between">
              <Text fontSize="lg">Total:</Text>
              <Text fontSize="lg" fontWeight="bold">₹{calculateTotal().toFixed(2)}</Text>
            </HStack>
            <Divider my={4} />
            <Button colorScheme="teal" size="lg" w="full" onClick={handlePayment}>
              Pay Now
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
