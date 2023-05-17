import axios from 'axios';
import React from 'react'
import './AddSolution.css';
import { getCookie } from '../Cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './Admin Navbar/AdminNavbar';
import AddBenefits from './AddBenefits';
import AddFeatures from './AddFeatures';
import { useState } from 'react';
import url from '../Url';
var title = ""
var description = ""
var coverimg = ""
var category = ""
var img1 = ""
var img2 = ""
var img3 = ""
var products = ""

function AddSolution() {
   var isLogin = localStorage.getItem("login")
   const [clicked1, setIsClicked] = useState(false)
   const [clicked2, setIsClicked1] = useState(false)
   const navigate = useNavigate();
   var token = getCookie("token")
   // axios.defaults.headers.common['Authorization'] = "Bearer "+ token;
   // axios.defaults.headers.common['Accept'] = 'multipart/form-data'
   // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
   console.log("token", token)
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
   const handleCategory = (event) => {
      category = event.target.value
      console.log(category)
   }
   const handleImg1 = (event) => {
      img1 = event.target.value
      console.log(img1)
   }
   const handleImg2 = (event) => {
      img2 = event.target.value
      console.log(img2)
   }
   const handleImg3 = (event) => {
      img3 = event.target.value
      console.log(img3)
   }
   const handleProducts = (event) => {
      products = event.target.value
      console.log(products)
   }
   const handleClick1 = () => {
      setIsClicked(true)
   }
   const handleClick2 = () => {
      setIsClicked1(true)
   }

   const handleClick = () => {
      var formBody = {
         "title": title,
         "description": description,
         "coverimg": coverimg,
         "solcategory": category,
         "solimg1": img1,
         "solimg2": img2,
         "solimg3": img3,
         "productsused": products
      }
      axios.post(url + "/add-solution",
         formBody, {
         headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
         }
      }

      ).then(function (response) {
         if (response.status == 200) {
            console.log("solution added")
            toast('Solution Added Successfully', {
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
                        Add Solution
                     </div>
                     <div class="form-1">
                        <div class="inputfield">
                           <label>Solution Title</label>
                           <input type="text" onChange={handleTitle} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Description</label>
                           <textarea class="textarea" onChange={handleDescription}></textarea>
                        </div>
                        <div class="inputfield">
                           <label>Cover Image</label>
                           <input type="text" onChange={handleCoverimg} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Solution Category</label>
                           <input type="text" onChange={handleCategory} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Image 1</label>
                           <input type="text" onChange={handleImg1} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Image 2</label>
                           <input type="text" onChange={handleImg2} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Image 3</label>
                           <input type="text" onChange={handleImg3} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Products Used</label>
                           <input type="text" onChange={handleProducts} class="input" />
                        </div>

                        <div class="inputfield">
                           <input type="submit" value="Register" onClick={handleClick} class="btn" />
                        </div>
                        <div class="inputfield">
                           <input type="submit" value="Add Benefits" onClick={handleClick1} class="btn" />
                        </div>

                        <div class="inputfield">
                           <input type="submit" value="Add Features" onClick={handleClick2} class="btn" />
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
               {/* <AddBenefits/>
    <AddFeatures/> */}
               {(clicked1) ? (<AddBenefits />
               ) : (null)}
               {(clicked2) ? (<AddFeatures />
               ) : (null)}
            </>) : (<><h1>Error: Not Logged IN</h1></>)
         }

      </>
   )
}
{/* <div class="inputfield">
          <label>Gender</label>
          <div class="custom_select">
            <select>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
       </div> 
        <div class="inputfield">
          <label>Email Address</label>
          <input type="text" class="input"/>
       </div> 
      <div class="inputfield">
          <label>Phone Number</label>
          <input type="text" class="input"/>
       </div> 
      <div class="inputfield">
          <label>Address</label>
          <textarea class="textarea"></textarea>
       </div> 
      <div class="inputfield">
          <label>Postal Code</label>
          <input type="text" class="input"/>
       </div> 
      <div class="inputfield terms">
          <label class="check">
            <input type="checkbox"/>
            <span class="checkmark"></span>
          </label>
          <p>Agreed to terms and conditions</p>
       </div>  */}
export default AddSolution;

