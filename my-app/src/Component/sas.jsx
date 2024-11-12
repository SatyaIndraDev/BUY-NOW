
import { FaShoppingCart} from "react-icons/fa";

import { Link } from "react-router-dom";

import { LuLogIn } from "react-icons/lu";
import { Box, HStack, Input } from "@chakra-ui/react";



function Navbar (){

const handleClick=()=>{

console.log("clicked")

}

  return (
   
    
<div style={{display:"flex", backgroundColor:"#FAFAFA"}}>


<Link to="/" >
<img src="./images/Buy-now1.png" alt="" style={{width :"200px"  , height:"100px"}}/>

</Link>
  <Link to="/" style={{padding:"40px"}}>
      <h3 data-testid="home-link">Home</h3>
    </Link>
 

  
    <Link to="/mens" style={{padding:"40px"}} >
      <h3 data-testid="home-link">Mens</h3>
    </Link>

    {/* <Link to="/cart" style={{ padding:"40px" ,paddingLeft:"100px"}}>
    <FaShoppingCart onClick={handleClick} />
    </Link> */}
    
    <Link to="/mens" style={{padding:"40px"}}>
      <h3 data-testid="home-link">Womens</h3>
    </Link>
   
    <Link to="/mens" style={{padding:"40px"}}>
      <h3 data-testid="home-link">Kids</h3>
    </Link>
   
    <div style={{padding:"35px"}}>
    <Input  className = "searchAddress"  placeholder = "Search"  w = "650px" borderRadius={"20px"}/>
    </div>
   




    <Link to="/cart" style={{ padding:"40px" ,paddingLeft:"100px"}}>
    <FaShoppingCart onClick={handleClick} />
    </Link>
   
  

    <Link to="/admin" style={{padding:"40px 0px"}}>
    <LuLogIn />
    </Link>

 

    
   
    </div>


  )  
  
}

export default Navbar