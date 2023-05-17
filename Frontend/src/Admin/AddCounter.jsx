import axios from 'axios';
import React from 'react'
import './AddSolution.css';
import { getCookie } from '../Cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from './Admin Navbar/AdminNavbar';

import url from '../Url';
var parameter = ""
var count = ""

function AddCounter() {

   var isLogin = localStorage.getItem("login")
   var token = getCookie("token")
   console.log("token", token)
   const handleParameter = (event) => {
      parameter = event.target.value
      console.log(parameter)
   }
   const handleCount = (event) => {
      count = event.target.value
      console.log(count)
   }
   const handleClick = () => {
      var formBody = {
         "parameter": parameter,
         "count": count

      }
      axios.post(url + "/successCount",
         formBody, {
         headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
         }
      }

      ).then(function (response) {
         if (response.status == 200) {
            console.log("Counter added")
            toast('Counter Added Successfully', {
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
                        Add Home Page Counter
                     </div>
                     <div class="form-1">
                        <div class="inputfield">
                           <label>Parameter</label>
                           <input type="text" onChange={handleParameter} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Count</label>
                           <input type="text" onChange={handleCount} class="input" />
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
               />
            </>) : (<><h1>Error: Not Logged IN</h1></>)
         }

      </>
   )
}

export default AddCounter;