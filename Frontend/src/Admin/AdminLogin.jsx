import React from 'react'
import './AddSolution.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Cookies';
import axios from 'axios';
import url from '../Url';
var email = ""
var password = ""

function AdminLogin() {
   const navigate = useNavigate()
   var token = getCookie("token")
   const handleEmail = (event) => {
      email = event.target.value

   }
   const handlePassword = (event) => {
      password = event.target.value
   }

   const handleClick = () => {
      // isLoggedIn(true)
      var formBody = {
         "email": email,
         "password": password
      }
      if (email != "" && password != "") {
         axios.post(url + "/login-admin",
            formBody, {
            headers: {
               "Content-Type": "multipart/form-data",
               "Authorization": "Bearer " + token
            }
         }

         ).then(function (response) {
            if (response.status == 200) {
               console.log("Login Successful")
               toast('Login Successfully', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
               });
               localStorage.setItem("login", "true")
               navigate('/add-product')
            }
         }).catch(function (error) {
            console.log("error", error)
            toast('Invalid Credentials', {
               position: "bottom-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark",
            });
         })
      }

   }


   return (
      <>
         {/* <AdminNavbar/> */}
         <div className="form-contain">
            <div class="wrapper-form">
               <div class="title-form">
                  Admin Login
               </div>
               <div class="form-1">
                  <div class="inputfield">
                     <label>Email ID</label>
                     <input type="email" onChange={handleEmail} class="input" required />
                  </div>

                  <div class="inputfield">
                     <label>Password</label>
                     <input type="password" onChange={handlePassword} class="input" />
                  </div>


                  <div class="inputfield">
                     <input type="submit" value="Submit" onClick={handleClick} class="btn" />
                  </div>
                  {/* <Outlet/> */}
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
         />
      </>
   )
}

export default AdminLogin;