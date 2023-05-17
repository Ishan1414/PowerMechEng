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
function AddBenefits() {
   const [clicked1, setIsClicked] = useState(false)
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
         "name": title,
         "description": description,
         "icon": coverimg,

      }
      axios.post(url + "/solutionbenefits/" + name,
         formBody, {
         headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
         }
      }

      ).then(function (response) {
         if (response.status == 200) {
            console.log("solution added")
            toast('Solution Benefit Added Successfully', {
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
            (isLogin == "true") ? (
               <>
                  <AdminNavbar />
                  <div className="form-contain">
                     <div class="wrapper-form">
                        <div class="title-form">
                           Add Solution Benefits
                        </div>
                        <div class="form-1">
                           <div class="inputfield">
                              <label>Solution Name</label>
                              <input type="text" onChange={handleName} class="input" />
                           </div>
                           <div class="inputfield">
                              <label>Benefit Name</label>
                              <input type="text" onChange={handleTitle} class="input" />
                           </div>
                           <div class="inputfield">
                              <label>Description</label>
                              <textarea class="textarea" onChange={handleDescription}></textarea>
                           </div>
                           <div class="inputfield">
                              <label>Icon</label>
                              <input type="text" onChange={handleCoverimg} class="input" />
                           </div>

                           <div class="inputfield">
                              <input type="submit" value="Register" onClick={handleClick} class="btn" />
                           </div>
                           <div class="inputfield">
                              <input type="submit" value="Add more Benefits" onClick={handleClick1} class="btn" />
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
                  {(clicked1) ? (<AddBenefits />
                  ) : (null)}
               </>
            ) : (<><h1>Error: Not Logged IN</h1></>)
         }

      </>
   )
}

export default AddBenefits;