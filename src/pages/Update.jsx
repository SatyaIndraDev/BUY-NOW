import { Box,Button,Input ,Center} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatedata } from '../Redux/Admin/actions'

const initialdata={
   id:"",
   name:"",
   
   rating:"",
   
   image:"",
 
   price:"",
   desc:"",


}

export const Update=({setRen})=>{

   const [data,setData]=useState(initialdata)
   const dispatch=useDispatch()
   const handlechange=(e)=>{
const {name,value}=e.target
setData((pre)=>({...pre,[name]:value}))
   }
   const ourdata=useSelector((state)=>state.update.isLoading)
  //  console.log(ourdata)
  //  console.log(data)
   const handlesubmit=(e)=>{
      e.preventDefault()
      
      const {id,desc,image,name,rating,price}=data
      if(id&&desc&&image&&name&&rating&&price){
          dispatch(updatedata(id,data,setRen))
          setData(initialdata)
      }

else{
  alert ("Ohh! you are not providing complete data")
}
  }


    return <div>

     
       <h1 style={{textAlign:"center" ,fontSize:"20px" ,color:"orange",marginTop:"30px"}}>Update Your Products</h1>
       <Box>
    <Box mt="50px">
    <Center>
<form onSubmit={handlesubmit}>
    <Box >

    <Input  value={data.id} onChange={handlechange} name="id"   textAlign="center" placeholder="Please Enter Id here" mt="10px" h="30px" w="300px"/>

    <br />
        <Input  value={data.image} onChange={handlechange} name="image"  type="text"  textAlign="center" placeholder="image " mt="10px" h="30px" w="300px"/>

        <br />

        <Input value={data.name} onChange={handlechange}  name="name" type="text"   textAlign="center" placeholder="name" mt="10px" h="30px" w="300px"/>
       
        <br />

        <Input value={data.rating} onChange={handlechange}  name="rating" type="number"   textAlign="center" placeholder="rating" mt="10px" h="30px" w="300px"/>
       
       <br />

        <Input value={data.desc}  onChange={handlechange} name="desc"  type="text" textAlign="center" placeholder="description" mt="10px" h="30px" w="300px"/>
       
        <br />
        <Input value={data.price} onChange={handlechange}  name="price"   type="number" textAlign="center" placeholder="price" mt="10px" h="30px" w="300px"/>
      
        
     
      </Box>
{ourdata===false?<Button   width="150px" mt="10px" bg="#8BC34A" marginLeft="80px" textAlign="center" type="submti">
    
    
    
    UPDATE</Button>
    :
    
    
    <Button
    isLoading
    loadingText='Submitting'
    colorScheme='teal'
    variant='outline'
    mt="10px" width="150px" marginLeft="80px"  textAlign="center"
  >
    UPDATE 
  </Button>
    
    }
</form>
</Center>
</Box>
</Box>

    </div>
   } 