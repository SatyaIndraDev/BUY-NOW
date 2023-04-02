import Navbar from "../Navbar/Navbar";

import { Box,Button,Center,Img,VStack,Text} from "@chakra-ui/react";
import {
    Alert,
    AlertIcon,
    
  } from '@chakra-ui/react'

function Cart (){

    let array=JSON.parse(localStorage.getItem("cart"))
    ||[]

    return(
        <>
        {/* "cart" */}
        <Navbar/>
        
        <Button   p={4}
  color='white'
  fontWeight='bold'
  borderRadius='md'
  bgGradient='linear(to-r, teal.500, green.500)'
  _hover={{
    bgGradient: 'linear(to-r, red.500, yellow.500)',
  }} onClick={()=>{
    return<Alert status='success' variant='subtle'>
    <AlertIcon />
    Data uploaded to the server. Fire on!
  </Alert>
    
  }}>Place Order</Button>
    
        {
            array?.map((el,i)=>{
    
                        return <Box mt="25px"  key={el.id} boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;" borderRadius={"sm"} alt="Clothes" objectFit={"cover"} _hover={{ transform: "scale(0.9)", }} transition={"0.1s ease-in-out"} height="400px" w="30%" >
                        <Center >
                          <Img height="200px" w="100%" src={el.image}   />
                        </Center>
              
                        <VStack spacing={2} p={2}>
                          <Text fontSize={"20px"} fontWeight="bold">{el.name}</Text>
                          <Text >{el.name}</Text>
                          <Text >{el.desc}</Text>
                          <Text >{el.price}</Text>
                          <Text >{el.brand}</Text>
                        
                        </VStack>
                      </Box>
    
    
    
            })
        }
        
        </>
    )
    
    }

export default Cart