import React from 'react'
import logo from "./flags/logo4.png";
import {useNavigate} from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <div className='logoDiv'>
        <img src={logo} 
          className='logo-image' 
          alt="logo of the webpage" 
          onClick={ () => navigate("/")} /> 
    </div>
  )
}

export default Logo