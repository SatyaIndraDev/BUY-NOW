import Navbar from "../Navbar/Navbar";

import {Button,FormControl,Input} from "@chakra-ui/react"
 import axios from "axios"

 import{useState} from "react"
import { Container } from "react-bootstrap";
import Product from "./Adminproductdata";

function Admin (){
    const initial_state = {
        image: "",
        name: "",
        rating: "",
        desc:"",
        price:""
      }
    
    
    const[input_data,setData]=useState(initial_state)
    
    
    const handleChange =(e)=>{
    let name=e.target.name
    let value=e.target.value
    setData({...input_data,[name]:value})
    
    }
    
    
    const Add_cat=async ()=>{
      const url=`https://products-v7vr.onrender.com/products?`
      let res=await axios.post(url,input_data)
      console.log(res)
    }
    
    const handleSubmit=(e)=>{
      e.preventDefault();
      Add_cat()
    }
    
    
      return (
       <Container>
      <Navbar/>
        <div className="addCatContainer">
          <form className="form">
            <FormControl>

                              <Input onChange={handleChange} name ="image" className="image" placeholder="Image" />

              <Input onChange={handleChange} name ="name" className="name" placeholder="Name" />

            
    
              <Input onChange={handleChange} name ="rating"  className="likes" placeholder="rating" type="number" />

              <Input onChange={handleChange}  name ="desc"  className="description" placeholder="Description" />

              <Input onChange={handleChange} name ="price"  className="cost" placeholder="price" type="number" />

              {/* <Input onChange={handleChange} name ="id"  className="id" placeholder="id" type="number" /> */}

              <Button onClick={handleSubmit} colorScheme={"green"} className="submitBtn">
                Submit
              </Button>
            </FormControl>
          </form>
        </div>
        <Product/>
        </Container>
      );
}

export default Admin