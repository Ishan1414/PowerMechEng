import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { blue } from '@mui/material/colors';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button} from 'reactstrap';
import './Navbar.css'
import NavLinks from './NavLinks';

const Navbar = () => {
  const [open,setOpen] = useState(false);
  const [sticky,setSticky] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const handleScroll = () =>{
      setSticky(window.scrollY);
    };
    window.addEventListener("scroll",handleScroll);
    return()=>window.removeEventListener("scroll",handleScroll);
  });
  function handleClick(){
    navigate('/home')
  }
  function handleClick1(){
    navigate('/contactus')
  }
  return (
    // <nav className={`${sticky ? "sticky" :""}`}>
    <nav className="sticky">
        <div className="flex items-center font-medium justify-around height-63 navbar">
            <div className="z-50 p-5 md:w-auto w-full flex justify-between ">
              <img src="https://raw.githubusercontent.com/Ishan1414/PowerMechEngg/master/powermechlogo.png" alt="logo" className='logo-img md:cursor-pointer' onClick={()=>handleClick()}/>
        
              
            </div>
            <div className="text-3xl md:hidden icon1 text-white openbutton" onClick={()=>setOpen(!open)}>
              {/* <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon> */}
              <FontAwesomeIcon icon={faBars} style={{ color: "white", fontSize: "30px" }}/>
                </div>
            <ul className='md:flex hidden uppercase items-center gap-5 font-[Poppins]'>
              {/* <li className='py-7 px-2 inline-block md:cursor-pointer navbar-links'>
                Home
              </li> */}
              {/* <li>
            <NavLink to="/" className="py-7 px-3 inline-block">
              Home
            </NavLink>
          </li> */}
          <NavLinks/>
          
          {/* style={{color:"white",fontSize:16,marginLeft:50,background:blue,borderRadius:5}} */}
            </ul>
          {/* Mobile Nav */}
          <ul className={`
          md:hidden bg-black absolute w-full h-full bottom-0 py-24 pl-4
          duration-500 ulsticky ${open ? "left-0" : "left-[-100%]"} 
          `}>
          {/* <li className='py-7 px-3 inline-block text-white'>
                Home
              </li> */}
              <NavLinks/>
              <div className="closebutton">
              <ion-icon name="close"  onClick = {()=>setOpen(!open)}></ion-icon>
              </div>
        
          </ul>
          
        </div>
    </nav>
  )
}

export default Navbar;
