import { Flex,Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";




function Navbar (){
  return (
    <Flex justifyContent="space-between" pl="40px" pr="40px" w='100%' h='50px'bgGradient={[
      'linear(to-tr, teal.300, yellow.400)',
      'linear(to-t, blue.200, teal.500)',
      'linear(to-b, orange.100, purple.300)',
    ]}>
<Text fontSize={32}>Buynow</Text>
    
<Link to="/">
      <h3 data-testid="home-link">Home</h3>
    </Link>
  
  
    <Link to="/mens">
      <h3 data-testid="home-link">Mens</h3>
    </Link>
    
    <Link to="/mens">
      <h3 data-testid="home-link">Womens</h3>
    </Link>
   
    <Link to="/login">
      <h3 data-testid="home-link">Login</h3>
    </Link>
  
    <Link to="/cart">
      <h3 data-testid="cart-link">Cart</h3>
    </Link>
    <Link to="/admin">
      <h3 data-testid="checkout-link">Admin</h3>
    </Link>
    </Flex>
    
    
  
 

  )  
  
}

export default Navbar