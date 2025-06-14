import { createContext,useState } from "react";



export const Context=createContext()

export function Authcontext (props){

// let auth=false;


const [auth,setauth]=useState(false)


const login=(input)=>{
const{email,password}=input

    if((email==="admin@gmail.com") && (password==="admin")){
            setauth(true)
            console.log("login success")
            console.log("logged")

    }
    else{
       setauth(false)
        console.log("login fail")
    }
}

const logout = () => {
    
setauth(false);
    console.log("logout success");
  };
    return(
        <Context.Provider value={{auth,login,logout}}>
     {props.children}
        </Context.Provider> 
        
        )





}