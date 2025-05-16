import { Box,Button,Center,Img,SimpleGrid,Spinner,  Flex,Text, VStack ,Grid} from "@chakra-ui/react";
import {useState,useReducer,useEffect} from "react"

import axios from "axios";
import { useDispatch } from "react-redux";
import { deletedata } from "../Redux/Admin/actions";


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

function Product ({setRen, ren}){
 


const [state,dispatch]=useReducer(reducer,initialState)

const [rendor,setRendor] =useState(false)


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


const [id,setId]=useState("")
const dispatch2=useDispatch()



useEffect(()=>{
const url=`https://buy-now-be.onrender.com/products`



  getData(url)  
  
  },[rendor,ren])





// delete-----------------
const handleDelete =async (_id)=>{



if(_id){
    dispatch2(deletedata(_id,setRen))
    setRen(true)  
 
    
}

else{
alert ("Ohh! you are not providing complete data")
}
 

}






  return (
    <div>
     
     
  
    
    {/* Map the below container against your data */}

    {state.isLoading?
    <Center><Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  /></Center>:

    <Grid  gap='6px'  templateColumns="repeat(4,1fr)" className="main_container" m="20px" >

      {
         state?.data?.products?.map((el)=>{


       
      return <Box mt="25px" m="30px" p="10px"  key={el.id} boxShadow=" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; " textAlign={"center"}    >
        <Center>
          <Img height="300px" w="100%" src={el.image}/>
        </Center>
        <h1>ID: {el._id}</h1>
          <Text fontSize={"20px"} fontWeight="bold">{el.name}</Text>
          <Text >{el.desc}</Text>
          <Text >{el.rating}</Text>
          <Text >{el.price}</Text>
          <Button onClick={()=>{handleDelete(el._id)}} className="delete" style={{width:"80px" ,height:"30px" ,backgroundColor:"#D1C4E9" , marginTop:"20px"}}>Delete</Button>
       
      </Box>


          })}
    </Grid>
}
  </div>
  );
}

export default Product
