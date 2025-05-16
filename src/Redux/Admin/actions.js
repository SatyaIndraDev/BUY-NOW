
import axios from "axios";
import { postreq,postsucc,postfail, deletereq, deletesucc,deletefail, updatereq, updatesucc, updatefail } from "./actionTypes";
export const postrequest=()=>{
    return {type:postreq}
}
export const postsuccess=()=>{
    return {type:postsucc}
}
export const postfailure=()=>{
    return {type:postfail}
}
export const postdata=(obj ,setRen)=>(dispatch)=>{
    dispatch(postrequest())
    axios.post("https://buy-now-be.onrender.com/products",obj).then((res)=>{
        // console.log(res.data)
        alert(`Product is added successfully `)
        dispatch(postsuccess())

        setRen((prev) => !prev);
    }).catch((error)=>{
        console.log(error)
        dispatch(postfailure())
    })
}
// delete

export const deleterequest=()=>{
    return {type:deletereq}
}
export const deletesuccess=()=>{
    return {type:deletesucc}
}
export const deletefailure=()=>{
    return {type:deletefail}
}
export const deletedata=(id,setRen)=>(dispatch)=>{
    console.log(id)
dispatch(deleterequest())

axios.delete(`https://buy-now-be.onrender.com/products/${id}`).then((res)=>{
    console.log(res)
    alert(`Product with Id ${id} is Successfully deleted`)
    dispatch(deletesuccess());
    setRen((prev) => !prev);
}).catch((error)=>{
    dispatch(deletefailure())
    alert("!oops something going wrong")
})
}
// updatingpart
export const updaterequest=()=>{
    return {type:updatereq}
}
export const updatesuccess=()=>{
    return {type:updatesucc}
}
export const updatefailure=()=>{
    return {type:updatefail}
}
export const updatedata=(id,obj,setRen)=>(dispatch)=>{
    console.log(id,obj)
    dispatch(updaterequest())
    axios.patch(`https://buy-now-be.onrender.com/products/${id}`,obj).then((res)=>{
        console.log(res)
        alert(`Product with id - ${id} is successfully Updated`)
        // console.log(`Product with id${id} is successfully Updated`)
        dispatch(updatesuccess())
        setRen((prev) => !prev);
    }).catch((error)=>{
        console.log(error)
        alert("!Opps something going wrong")
        dispatch(updatefailure())
    })
}