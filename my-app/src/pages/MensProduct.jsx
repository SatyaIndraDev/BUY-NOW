import Navbar from "../Navbar/Navbar";

import { Box,Button,Center,Img,SimpleGrid,Text,VStack,Select,Spinner,Input} from "@chakra-ui/react";

import {useState,useReducer,useEffect} from "react"

import axios from "axios";


// let cart=JSON.parse(localStorage.getItem("Cart"))||[]

let array=JSON.parse(localStorage.getItem("cart"))||[]
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const reducer = (state,{type,payload}) => {

switch(type){

  case 'REQUEST_MADE':return{...state, isLoading:true}
case'REQUEST_SUCESS':return{...state, isLoading:false, data:payload}
case'REQUEST_ERROR':return{...state, isLoading:false}
default:return state
};

}





function Product (){

  const [items, setItems] = useState([]);
 
const [order,setOrder]=useState("asc")

const [state,dispatch]=useReducer(reducer,initialState)












const getData=async(url)=>{




try{
  dispatch({type:'REQUEST_MADE'})
let res=await axios(url);

dispatch({type:'REQUEST_SUCESS',payload:res.data})

}
catch(err) {
  dispatch({type:'REQUEST_ERROR'})
 
}
}




useEffect(()=>{
const url=`https://products-v7vr.onrender.com/products?_sort=price&_order=${order}`

  getData(url)  
  
  },[order,])

// ________sortingggggggggg
const handleSort=()=>{
 order==='asc'?setOrder('desc'):setOrder('asc');
}

//Filteringggg

const handleFilter=(e)=>{

const value=e.target.value

let url;
if(value===''){
  url=`https://products-v7vr.onrender.com/products?_sort=price&_order=${order}`
}
else{
  url=`https://products-v7vr.onrender.com/products?desc=${value}`
}
getData(url)

}


// searching_------
const handleChange=(e)=>{
  let url;
  const value=e.target.value

    url=`https://products-v7vr.onrender.com/products?q=${value}`
  
  getData(url)


 
}







// Cart addingg func

const handleCartData=(el,i)=>{
  array.push(el)
  // console.log(array)
  
  localStorage.setItem("cart",JSON.stringify(array)) 


}


  return (
    <div margin="20px">
      <Navbar/>

      <VStack mt={5} p="5">
        <Input onInput={(e)=>handleChange(e)} className = "searchAddress"  placeholder = "Search Data"  w = "80%" />

        </VStack>


      <div className="sortingButtons"  >
        <Button isDisabled={order==="asc"} onClick={handleSort} colorScheme={"purple"} className="sortByCostAsc" ml="20px">
          Sort by Asc
        </Button>
        <Button isDisabled={order==="desc"} onClick={handleSort} colorScheme={"red"} className="sortByCostDesc" m={2}>
          Sort by Desc
        </Button>
      </div>
      
        <Select onChange={handleFilter} placeholder="select option" w="400px" ml="20px" >
          <option value="tshirt">Tshirt</option>
          <option value="shorts">Shorts</option>
          <option value="hoodie">Hoodie</option>
          <option value="joggers">Joggers</option>
          <option value="shoes">Shoes</option>
        </Select>
      

      {/* Map the below container against your data */}

      {state.isLoading?
      <Center><Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    /></Center>:
      <SimpleGrid  gap='10px' columns={4} className="main_container" margin="20px">

        {
          state.data?.map((el,i)=>{


         
        return <Box mt="25px"  key={el.id} boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;" borderRadius={"sm"} alt="Clothes" objectFit={"cover"} _hover={{ transform: "scale(0.9)", }} transition={"0.1s ease-in-out"} >
          <Center >
            <Img height="400px" w="100%" src={el.image}   />
          </Center>

          <VStack spacing={2} p={2}>
            <Text fontSize={"20px"} fontWeight="bold">{el.name}</Text>
            <Text >{el.rating}</Text>
            <Text >{el.desc}</Text>
            <Text >{el.price}</Text>
            <Text >{el.description}</Text>
            <Button  p={4}
  color='white'
  fontWeight='bold'
  borderRadius='md'
  bgGradient='linear(to-r, teal.500, green.500)'
  _hover={{
    bgGradient: 'linear(to-r, red.500, yellow.500)',
  }} onClick={()=>{handleCartData(el,i)}} colorScheme="red"  >
    
    Add To Cart</Button>
          </VStack>
        </Box>


            })}
      </SimpleGrid>
}
    </div>
  );
}

export default Product