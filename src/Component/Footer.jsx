import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  Image
} from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'


 const Footer = () => (
  <Container as="footer" role="contentinfo">
 
    <Stack
      spacing="8"
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
      py={{
        base: '12',
        md: '16',
      }}
    >
      <Stack
        spacing={{
          base: '6',
          md: '8',
        }}
        align="start"
      >
       
        <Text color="muted">BuyNow.com</Text>
      </Stack>
      <Stack
        direction={{
          base: 'column-reverse',
          md: 'column',
          lg: 'row',
        }}
        spacing={{
          base: '12',
          md: '8',
        }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Product
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">How it works</Button>
              <Button variant="link">Pricing</Button>
              <Button variant="link">Use Cases</Button>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="subtle">
              Legal
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button variant="link">Privacy</Button>
              <Button variant="link">Terms</Button>
              <Button variant="link">License</Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing="4">
          <Text fontSize="sm" fontWeight="semibold" color="subtle">
            Stay up to date
          </Text>
          <Stack
            spacing="4"
            direction={{
              base: 'column',
              sm: 'row',
            }}
            maxW={{
              lg: '360px',
            }}
          >
            <Input placeholder="Enter your email" type="email" required w="230px" />
            <Button variant="primary" type="submit" flexShrink={0}>
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
    <Divider />
    <Stack
      pt="8"
      pb="12"
      justify="space-between"
      direction={{
        base: 'column-reverse',
        md: 'row',
      }}
      // align="center"
    >
      
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Buy-Now, Inc. All rights reserved.
      </Text>
      <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href="#"
          aria-label="LinkedIn"
          icon={<FaLinkedin fontSize="1.25rem" />}
        />
        <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="1.25rem" />} />
      </ButtonGroup>
    </Stack>
  </Container>
)


export default Footer


// import {Flex,Container,Image} from "@chakra-ui/react"



// function Footer (){
//     return <>
//     <Flex background-color="skyblue" mt="40px" gap="5px" color="grey">
//         <Container background="#F5F5F5">
//        <p>About</p>
//        <p>Our story</p>
//       <p>Contact us</p>
//       <p>Careers</p>
//       <p>Privacy policy</p>
//       </Container >
//       <Container  background="#F5F5F5">
//         <p>Support</p>
//       <p>Payments</p>
//       <p>Returns/Exchange</p>
//       <p>Shipment</p>
//       <p>Terms & conditions</p>


//       </Container>


//       <Container  background="#F5F5F5">
//        <p>About</p>
//        <p>Timings: 10 AM - 6 PM (Mon - Sat)

// Call: +91 70112666

// E-Mail: care@buybychoice.com</p>
       
//       <p>Privacy policy</p>
//       </Container>
//       <Container>
//       <h1>Registered Office Address:</h1>
        
//         <p>

// Buynow Internet Private Limited,

// Buildings Alyssa, Begonia &
// Clove Embassy Tech Village,
// Outer Ring Road,
// Bengaluru, 560103,

// Karnataka, India

// CIN : U511097282725

// Telephone: 044-455252
// </p>
// </Container>
    
//        </Flex>
      

//   <center> <Image src="./images/f.png" alt='s1' >
  
//   </Image> </center>

//       </> 




        
   
// }

// export default Footer