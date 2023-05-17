import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './AddSolution.css';
import { getCookie, setCookie } from '../Cookies';
import AdminNavbar from './Admin Navbar/AdminNavbar';
import url from '../Url';
var email = ""
var password = ""
var name = ""
function AddAdmin() {
   var isLogin = localStorage.getItem("login")
   axios.get(url + "/refresh-token", {
      headers: {
         "Authorization": "Bearer " + getCookie("token"),
         "isRefreshToken": "true"
      }
   }).then(function (response) {
      if (response.status == 200) {
         // console.log("In refresh token")
         setCookie("token", response.data.token, 20);
         // setIsCategoryDisplayFetched(true);
         // console.log("Token",response.data.token);
      }

   }).catch(function (error) {
      console.log("error");
   })
   const navigate = useNavigate();
   const handleEmail = (event) => {
      email = event.target.value
      console.log(email)
   }
   const handlePassword = (event) => {
      password = event.target.value
      console.log(password)
   }
   const handleName = (event) => {
      name = event.target.value
      console.log(name)
   }
   const handleClick = () => {
      var formBody = {
         "email": email,
         "password": password,
         "name": name,
      }

      axios.post(url + "/register", formBody, {

         headers: {
            "Content-Type": "multipart/form-data"
         }
      }).then(function (response) {
         if (response.status == 200) {
            console.log("solution added", response.data)
            localStorage.setItem("token", response.data.token)
            setCookie("token", response.data.token, 20)
            navigate('/add-solution')
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
                  <div className="wrapper-form">
                     <div className="title-form">
                        Add Admin
                     </div>
                     <div className="form-1">
                        <div class="inputfield">
                           <label>Email</label>
                           <input type="email" onChange={handleEmail} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Password</label>
                           <input type="password" onChange={handlePassword} class="input" />
                        </div>
                        <div class="inputfield">
                           <label>Name</label>
                           <input type="text" onChange={handleName} class="input" />
                        </div>
                        <div class="inputfield">
                           <input type="submit" value="Register" onClick={handleClick} class="btn" />
                        </div>
                     </div>
                  </div>
               </div>
            </>) : (<>
               <h1>Error: Not Logged In</h1>
            </>)
         }

      </>
   )
}
export default AddAdmin;