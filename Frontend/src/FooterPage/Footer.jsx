import React from 'react';
import './Animations.css';
import './headcontent.css';
import { GoLocation } from 'react-icons/go';
import { GoMail } from 'react-icons/go';
import { BiPhone } from 'react-icons/bi';
import { ImClock } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
function Footer(){
  const navigate = useNavigate()
  return (

    <div className='foot'>


      <div >
        <h1 className='leftside'>Useful Links</h1>
        <div className='foot-content'>
          <h2 onClick={()=>navigate("/aboutus")} className="footer-h2">About Us</h2>
          <h2 onClick={()=>navigate("/contactus")} className="footer-h2">Contact Us</h2>
          <h2 onClick={()=>navigate("/contactus")} className="footer-h2">Enquiry</h2>



        </div>

      </div>
      <div className='rightside'>
        <h1 className='leftside'>Important Links</h1>
        
        <h2 onClick={()=>navigate("/productcategory")} className="footer-h2">Products</h2>
        <h2 onClick={()=>navigate("/solutioncategory")} className="footer-h2">Solutions</h2>
        
      </div>
      <div className='endside'>
      
        <br></br>
        <div className='icon-with-text'>
          <GoLocation color='white' size={'1.5rem'} />
          <p>&nbsp;&nbsp;PowerMech Engineering Systems, Chikali, Pune</p>

        </div>
        <br></br>
        <div className='icon-with-text'>
          <GoMail color='white' size={'1.5rem'} />
          <p>&nbsp;&nbsp;<a href="mailto:salespowermech01@gmail.com?subject=Mail">salespowermech01@gmail.com</a></p>

        </div>
        <br></br>
        <div className='icon-with-text'>
          <BiPhone color='white' size={'1.5rem'} />
          <p>&nbsp;&nbsp;<a href="tel:+91-8668695159">+91-8668695159</a>
                         <a href="tel:+91-9284933200">+91-9284933200</a></p>

        </div>
        <br></br>
        <div className='icon-with-text'>
          <ImClock color='white' size={'1.5rem'} />
          <p>&nbsp;&nbsp;Mon - Fri 8:00 AM to 5:00 PM</p>

        </div>
        <br></br>

      </div>
    </div>


  )
}

export default Footer;