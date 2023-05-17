import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import AdminNavlinks from './AdminNavlinks';
const AdminNavbar = () => {
  const [open,setOpen] = useState(false);
  const [sticky,setSticky] = useState(false);
  const navigate = useNavigate();
  const handleClick1 = () => {
    localStorage.setItem("login", "false")
    navigate("/admin")
  }
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
  return (
    // <nav className={`${sticky ? "sticky" :""}`}>
    <nav className="sticky">
        <div className="flex items-center font-medium justify-around height-63 navbar">
            <div className="z-50 p-5 md:w-auto w-full flex justify-between ">
              <img src="https://raw.githubusercontent.com/Ishan1414/PowerMechEngg/master/powermechlogo.png" alt="logo" className='logo-img md:cursor-pointer' onClick={()=>handleClick()}/>
              <div className="text-3xl md:hidden icon1 text-white" onClick={()=>setOpen(!open)}>
              <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
                </div>
            </div>
            <ul className='md:flex hidden uppercase items-center gap-8 font-[Poppins]'>
              {/* <li className='py-7 px-2 inline-block md:cursor-pointer navbar-links'>
                Home
              </li> */}
              {/* <li>
            <NavLink to="/" className="py-7 px-3 inline-block">
              Home
            </NavLink>
          </li> */}
          <AdminNavlinks/>
          <div style={{color: "white"}} onClick = {handleClick1} className= "md:cursor-pointer">Logout</div>
            </ul>
          {/* Mobile Nav */}
          <ul className={`
          md:hidden bg-black absolute w-full h-full bottom-0 py-24 pl-4
          duration-500 ulsticky ${open ? "left-0" : "left-[-100%]"} 
          `}>
          {/* <li className='py-7 px-3 inline-block text-white'>
                Home
              </li> */}
              <AdminNavlinks/>
              
          </ul>

        </div>
    </nav>
  )
}

export default AdminNavbar;
