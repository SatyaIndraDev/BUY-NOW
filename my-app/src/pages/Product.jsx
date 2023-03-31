import Navbar from "../Navbar/Navbar";

function Product (){
  return  <Navbar/> 
  const [data,setData] = useState({});

  const [page,setPage] = useState(1);

  const {token,setAuth} = useContext(Context)
  const getData = async () => {
          
    const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?page=${page}&limit=10`

    let res =  await fetch(url)

    let data = await res.json();

    setData(data); //{data: Array(5), totalPages: 20}

}


useEffect(() => {

getData();

},[page]);
}

export default Product