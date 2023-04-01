import {Flex,Container,Image} from "@chakra-ui/react"



function Footer (){
    return <>
    <Flex background-color="skyblue" mt="40px" gap="5px" >
        <Container background="#F5F5F5">
       <p>About</p>
       <p>Our story</p>
      <p>Contact us</p>
      <p>Careers</p>
      <p>Privacy policy</p>
      </Container >
      <Container  background="#F5F5F5">
        <p>Support</p>
      <p>Payments</p>
      <p>Returns/Exchange</p>
      <p>Shipment</p>
      <p>Terms & conditions</p>




      </Container>



      <Container  background="#F5F5F5">
       <p>About</p>
       <p>Timings: 10 AM - 6 PM (Mon - Sat)

Call: +91 70112666

E-Mail: care@buybychoice.com</p>
       
      <p>Privacy policy</p>
      </Container>
      <Container></Container>
    
       </Flex>
       <Image src="./images/f.png" alt='s1' >
  
  </Image>
      </> 


        
   
}

export default Footer