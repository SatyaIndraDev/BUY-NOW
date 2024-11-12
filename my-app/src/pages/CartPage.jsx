import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, VStack, HStack, Text, Divider, IconButton, Image } from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load cart from localStorage on component mount
        const storedCart = JSON.parse(localStorage.getItem('cart2')) || [];
        setCart(storedCart);
    }, []);

    const removeFromCart = (productToRemove) => {
        // Filter out the product completely if quantity is 1 or reduce its quantity
        let updatedCart = cart.map(product => {
            if (product.id === productToRemove.id) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        }).filter(product => product.quantity > 0);

        setCart(updatedCart);
        localStorage.setItem('cart2', JSON.stringify(updatedCart));
    };

    const addToCart = (productToUpdate) => {
        // Increase the quantity of the product in the cart by 1
        const updatedCart = cart.map(product => {
            if (product.id === productToUpdate.id) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });

        setCart(updatedCart);
        localStorage.setItem('cart2', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        // Calculate the total cost based on quantity and price
        return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    const handlePayment = () => {
        // Clear the cart on successful payment
        localStorage.removeItem('cart2');
        setCart([]);
        alert("Payment Successful!");
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
                                key={product.id}
                                p={4}
                                borderWidth="1px"
                                borderRadius="md"
                                shadow="sm"
                                bg="gray.50"
                                width="full"
                            >
                                <HStack spacing={4}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        boxSize="80px"
                                        objectFit="cover"
                                        borderRadius="md"
                                        className="cart-item-image"
                                    />
                                    <Box flex="1">
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="bold">{product.name}</Text>
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                variant="ghost"
                                                aria-label="Remove item"
                                                onClick={() => removeFromCart(product)}
                                            />
                                        </HStack>
                                        <Text mt={2}>Price: ${product.price.toFixed(2)}</Text>
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
                                            Total: ${(product.price * product.quantity).toFixed(2)}
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
                            <Text fontSize="lg" fontWeight="bold">${calculateTotal().toFixed(2)}</Text>
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
