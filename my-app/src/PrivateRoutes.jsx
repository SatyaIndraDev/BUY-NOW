import {useContext} from "react"
import {Navigate} from "react-router-dom"
import {Context} from "./context/Authcontext"



function PrivateRoutes(props){

const {auth}=useContext(Context)
// console.log(Context)
console.log("maaz")
console.log(auth)


    if(!auth){
        return <Navigate to="/login"/>
    }
else{
    return props.children
}





}

export default PrivateRoutes