import { Link } from "react-router-dom";
import {useContext} from "react"
import { Context } from "../context/Authcontext";
import {
    Flex,Box,FormControl,FormLabel,Input,Checkbox,Stack,Button, Heading,Text,useColorModeValue,} from '@chakra-ui/react';

    import{useState} from "react"
    
  import Navbar from "../Navbar/Navbar";


const init={
  email:"",
  password:""
}
  export default function SimpleCard() {

    const [input,setinput]=useState(init)

const {login}=useContext(Context)
// console.log(login,auth)


const handleChange=(e)=>{
// console.log(e.target.value)
setinput({
  ...input,
  [e.target.name]:e.target.value
}
)
}

const handleSubmit=()=>{
  console.log(input)
  login(input)
}

console.log(input)

    return <div>
   <Navbar />
    
    <div> <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" name="email" onChange={handleChange} placeholder="test" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" onChange={handleChange}  placeholder="test1"/>
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            <Button onClick={handleSubmit}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
</div></div>
  }