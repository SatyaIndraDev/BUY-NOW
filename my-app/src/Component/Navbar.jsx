import React, { useContext, useState } from 'react';
import { FaBars, FaShoppingCart, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Context } from '../AllRoutes/AuthContext';
import { Input } from '@chakra-ui/react';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { auth ,logout} = useContext(Context);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleColor={
    color :"#212121"
  }

  

  return (
    <nav className="navbar">
      <div className="navbar-container">
       
        <div className="navbar-logo">


          <a href="/">
<img src="../images/Buy-now1.png" alt=""  style={{width :"200px" ,height:"65px"}}/>

          </a>

         
        </div>
        <Input  borderRadius={20} m={5}/>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="/" className="nav-links" style={handleColor}>Home</a>
          </li>
          <li className="nav-item">
            <a href="/mens" className="nav-links" style={handleColor}>Mens</a>
          </li>
          
          <li className="nav-item">
            <a href="/mens" className="nav-links" style={handleColor}>Women</a>
          </li>
          <li className="nav-item">
            <a href="/mens" className="nav-links" style={handleColor}>Collections</a>
          </li>
          <li className="nav-item">
            <a href="/cart" className="nav-links" style={handleColor}>
              Cart
              {/* <FaShoppingCart  /> */}
            </a>

            
          </li>
          {auth ? (
              <div>
            
              <button onClick={logout} colorScheme="teal">Logout</button>

              </div>
            ) : (
              // <Link to="/login">Login</Link>
              <a href="/login" className="nav-links" style={handleColor}>
            Login
              {/* <FaShoppingCart  /> */}
            </a>
            )}
          {/* <li className="nav-item">
            <a href="/admin" className="nav-links" style={handleColor}>Admin</a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
