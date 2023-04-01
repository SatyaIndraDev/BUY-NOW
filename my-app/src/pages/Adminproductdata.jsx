

import { Box,Button,Center,Img,SimpleGrid,Text,VStack,Select,Spinner} from "@chakra-ui/react";
import {useState,useReducer,useEffect} from "react"

import axios from "axios";


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





// delete-----------------
const handleDelete =async (id)=>{
const url=`https://products-v7vr.onrender.com/products/${id}`


let res= await axios.delete(url)

const url2=`https://products-v7vr.onrender.com/products?_sort=price&_order=${order}`

getData(url2)

}




  return (
    <div>
     
     
  
    
      {/* Map the below container against your data */}

      {state.isLoading?
      <Spinner />:
      <SimpleGrid  gap='10px' columns={4} className="main_container">

        {
          state.data?.map((el)=>{


         
        return <Box className="catsDetails" key={el.id}>
          <Center>
            <Img src={el.image}/>
          </Center>

          <VStack spacing={2} p={2}>
            <Text className="name" fontSize={"20px"} fontWeight="bold">{el.name}</Text>
            <Text className="rating">{el.rating}</Text>
            <Text className="likes">{el.desc}</Text>
            <Text className="breed">{el.price}</Text>
            <Text className="description">{el.description}</Text>
            <Button onClick={()=>{handleDelete(el.id)}} className="delete">Delete</Button>
          </VStack>
        </Box>


            })}
      </SimpleGrid>
}
    </div>
  );
}

export default Product