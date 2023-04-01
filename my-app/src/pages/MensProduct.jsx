import Navbar from "../Navbar/Navbar";

import { Box,Button,Center,Img,SimpleGrid,Text,VStack,Select,Spinner} from "@chakra-ui/react";

import {useState,useReducer,useEffect} from "react"

import axios from "axios";

import Cart from "../pages/Cart"




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
 
const [order,setOrder]=useState("asc")

const [state,dispatch]=useReducer(reducer,initialState)

const [filterBreed,setBreed]=useState("")


const [arr,setArr]=useState([])







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
setBreed(value)
}


// Cart addingg func

const handleCartData=(el)=>{
  setArr(el)
 
  // console.log(el)

}
<Cart arr={arr}/>


  return (
    <div>
      <Navbar/>
      <div className="sortingButtons">
        <Button isDisabled={order==="asc"} onClick={handleSort} colorScheme={"green"} className="sortByCostAsc">
          Sort by Asc
        </Button>
        <Button isDisabled={order==="desc"} onClick={handleSort} colorScheme={"red"} className="sortByCostDesc" m={2}>
          Sort by Desc
        </Button>
      </div>
      
        <Select onChange={handleFilter} placeholder="select option" w="400px">
          <option value="tshirt">Tshirt</option>
          <option value="shorts">Shorts</option>
          <option value="hoodie">Hoodie</option>
          <option value="joggers">Joggers</option>
          <option value="shoes">Shoes</option>
        </Select>
      

      {/* Map the below container against your data */}

      {state.isLoading?
      <Center><Spinner></Spinner></Center>:
      <SimpleGrid  gap='10px' columns={4} className="main_container">

        {
          state.data?.map((el)=>{


         
        return <Box mt="20px" className="catsDetails" key={el.id}>
          <Center >
            <Img height="400px" src={el.image}/>
          </Center>

          <VStack spacing={2} p={2}>
            <Text className="name" fontSize={"20px"} fontWeight="bold">{el.name}</Text>
            <Text className="rating">{el.rating}</Text>
            <Text className="likes">{el.desc}</Text>
            <Text className="breed">{el.price}</Text>
            <Text className="description">{el.description}</Text>
            <Button onClick={()=>{handleCartData(el)}} className="Add To Cart">Add To Cart</Button>
          </VStack>
        </Box>


            })}
      </SimpleGrid>
}
    </div>
  );
}

export default Product