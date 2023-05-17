import axios from 'axios';
import React from 'react'
import './AddSolution.css';
import { getCookie } from '../Cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './Admin Navbar/AdminNavbar';
import { useState } from 'react';
import url from '../Url';
var title = ""
var description = ""
var coverimg = ""
var name = ""
function AddProductFeatures() {
   const [clicked, setIsClicked] = useState(false)
   const navigate = useNavigate();
   var isLogin = localStorage.getItem("login")
   var token = getCookie("token")
   // axios.defaults.headers.common['Authorization'] = "Bearer "+ token;
   // axios.defaults.headers.common['Accept'] = 'multipart/form-data'
   // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
   console.log("token", token)
   const handleName = (event) => {
      name = event.target.value
      console.log(name)
   }
   const handleTitle = (event) => {
      title = event.target.value
      console.log(title)
   }
   const handleDescription = (event) => {
      description = event.target.value
      console.log(description)
   }
   const handleCoverimg = (event) => {
      coverimg = event.target.value
      console.log(coverimg)
   }
   function handleClick1() {
      setIsClicked(true)
   }
   const handleClick = () => {
      var formBody = {
         "title": title,
         "description": description,
         "image": coverimg,

      }
      axios.post(url + "/description/" + name,
         formBody, {
         headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
         }
      }

      ).then(function (response) {
         if (response.status == 200) {
            console.log("solution added")
            toast('Product Feature Added Successfully', {
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
                        Add Product Features
                     </div>
                     <div class="form-1">
                        <div class="inputfield">
                           <label>Product Number</label>
                           <input type="text" onChange={handleName} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Feature Name</label>
                           <input type="text" onChange={handleTitle} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Feature Description</label>
                           <textarea class="textarea" onChange={handleDescription}></textarea>
                        </div>
                        <div class="inputfield">
                           <label>Feature Icon</label>
                           <input type="text" onChange={handleCoverimg} class="input" />
                        </div>

                        <div class="inputfield">
                           <input type="submit" value="Register" onClick={handleClick} class="btn" />
                        </div>
                        <div class="inputfield">
                           <input type="submit" value="Add More Feature" onClick={handleClick1} class="btn" />
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
               {(clicked) ? (<AddProductFeatures />) : (null)}
            </>) : (<><h1>Error: Not Logged IN</h1></>)
         }

      </>
   )
}

export default AddProductFeatures;