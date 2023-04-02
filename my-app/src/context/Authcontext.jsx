import { createContext,useState } from "react";
import {Navigate,useNavigate,Link} from "react-router-dom"


export const Context=createContext()

export function Authcontext (props){

// let auth=false;


const [auth,setauth]=useState(false)


const login=(input)=>{
const{email,password}=input

    if((email==="test") && (password==="test1")){
            setauth(true)
            console.log("login success")
            console.log("logged")

    }
    else{
       setauth(false)
        console.log("login fail")
    }
}

    return(

        <Context.Provider value={{auth,login}}>

        {props.children}
    

        
    

        </Context.Provider> 
        
        )





}