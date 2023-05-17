import axios from 'axios';
import React from 'react'
import './AddSolution.css';
import { getCookie } from '../Cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './Admin Navbar/AdminNavbar';
import url from '../Url';

var mainlink = ""
var submenu = ""
var name = ""
function AddNavbar() {
   var isLogin = localStorage.getItem("login")
   const navigate = useNavigate();
   var token = getCookie("token")
   // axios.defaults.headers.common['Authorization'] = "Bearer "+ token;
   // axios.defaults.headers.common['Accept'] = 'multipart/form-data'
   // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
   console.log("token", token)
   const handleName = (event) => {
      name = event.target.value
      console.log(name)
   }
   const handleSubmenu = (event) => {
      submenu = event.target.value
      console.log(submenu)
   }
   const handleMainlink = (event) => {
      mainlink = event.target.value
      console.log(mainlink)
   }


   const handleClick = () => {
      var formBody = {
         "name": name,
         "mainlink": mainlink,
         "submenu": submenu,

      }
      axios.post(url + "/navbar",
         formBody, {
         headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
         }
      }

      ).then(function (response) {
         if (response.status == 200) {
            console.log("Navbar added")
            toast('Navbar Details Added Successfully', {
               position: "bottom-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
            });
         }
      }).catch(function (error) {
         console.log("error", error)
      })

   }

   return (
      <>
         {
            (isLogin == "true") ? (<>
               <AdminNavbar />
               <div className="form-contain">
                  <div class="wrapper-form">
                     <div class="title-form">
                        Add Navbar Details
                     </div>
                     <div class="form-1">
                        <div class="inputfield">
                           <label>Navbar Name</label>
                           <input type="text" onChange={handleName} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Main Link</label>
                           <input type="text" onChange={handleMainlink} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Submenu True or False </label>
                           <input type="text" onChange={handleSubmenu} class="input"></input>
                        </div>

                        <div class="inputfield">
                           <input type="submit" value="Register" onClick={handleClick} class="btn" />
                        </div>

                     </div>
                  </div>
               </div>
               <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
               /></>) : (<><h1>Error: Not Logged IN</h1></>)
         }

      </>
   )
}

export default AddNavbar;