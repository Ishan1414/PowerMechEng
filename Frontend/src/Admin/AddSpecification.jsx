import axios from 'axios';
import React from 'react'
import './AddSolution.css';
import { getCookie } from '../Cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './Admin Navbar/AdminNavbar';
import url from '../Url';
var specification = "";
var modelNum = "";

function AddSpecification() {
   var isLogin = localStorage.getItem("login")

   const navigate = useNavigate();
   var token = getCookie("token")
   // axios.defaults.headers.common['Authorization'] = "Bearer "+ token;
   // axios.defaults.headers.common['Accept'] = 'multipart/form-data'
   // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
   console.log("token", token)


   const handleSpecification = (event) => {
      specification = event.target.value
      console.log(specification)
   }
   const handleModel = (event) => {
      modelNum = event.target.value
      console.log(modelNum)
   }

   const handleClick = () => {
      var formBody = specification

      axios.post(url + "/specifications/" + modelNum,
         formBody, {
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
         }
      }

      ).then(function (response) {
         if (response.status == 200) {
            console.log("Specification added")
            toast('Product Specification Added Successfully', {
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
                        Add Specifications
                     </div>
                     <div class="form-1">
                        <div class="inputfield">
                           <label>Model Number</label>
                           <input type="text" onChange={handleModel} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Specification</label>
                           <input type="text" onChange={handleSpecification} class="input" />
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

export default AddSpecification;