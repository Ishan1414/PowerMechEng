import axios from 'axios';
import React, { useState } from 'react'
import './AddSolution.css';
import { getCookie } from '../Cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './Admin Navbar/AdminNavbar';
import url from '../Url';
var title = ""
var name = ""
var finalTitle = ""
function AddProductCategory() {
   const numbers = [1, 2, 3, 4, 5]
   console.log(numbers)
   var isLogin = localStorage.getItem("login")
   const [product, setProduct] = useState([])
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

      finalTitle = title.split(";")
      // setProduct(title.split(";"))
      console.log(finalTitle)
   }
   console.log("outside", finalTitle)

   const handleClick = () => {
      var formBody = {
         "productcategory": name,
         "modelNum": title,

      }
      axios.post(url + "/productcategory",
         formBody, {
         headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + token
         }
      }

      ).then(function (response) {
         if (response.status == 200) {
            console.log("solution added")
            toast('Product Category Added Successfully', {
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
                        Add Product Category
                     </div>
                     <div class="form-1">
                        <div class="inputfield">
                           <label>Category Name</label>
                           <input type="text" onChange={handleName} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Model Number</label>
                           <input type="text" onChange={handleTitle} class="input" />
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

export default AddProductCategory;