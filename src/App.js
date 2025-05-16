
import './App.css';
// import { Box } from '@chakra-ui/react';
// import Navbar from "../src/Navbar/Navbar"
// import SimpleCard from "../src/Login/Login"
import AllRoutes from "../src/AllRoutes/AllRoutes"
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';

function App() {
  return (<div>
    
  {/* <SimpleCard /> */}
 

<Navbar />
  <AllRoutes />
  
  <Footer />
  </div>
  )
  
}

export default App;
