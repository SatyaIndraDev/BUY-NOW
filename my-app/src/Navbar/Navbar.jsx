import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";




function Navbar (){
  return (
    <Flex justifyContent="space-between" pl="40px" pr="40px">
<Link to="/">
      <h3 data-testid="home-link">Home</h3>
    </Link>
  
  
    <Link to="/product">
      <h3 data-testid="home-link">Product</h3>
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