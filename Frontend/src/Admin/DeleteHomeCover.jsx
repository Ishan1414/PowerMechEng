import axios from "axios";
import React from "react";
import { getCookie } from "../Cookies";
import url from "../Url";
import './AddSolution.css';
import AdminNavbar from "./Admin Navbar/AdminNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var description = ""

function DeleteHomeCover() {
  var token = getCookie("token")
  var isLogin = localStorage.getItem("login")

  const handleDescription = (event) => {
    description = event.target.value
    console.log(description)
  }
  const handleClick = () => {

    axios.delete(url + "/deleteHomeCover/" + description, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + token
      }
    }).then(function (response) {
      if (response.status == 200) {
        console.log("DELETE", "Home Cover")
        toast('Home Cover Deleted Successfully', {
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
      console.log("Error", error)
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
                Delete Home Cover
              </div>
              <div class="form-1">
                <div class="inputfield">
                  <br /><br /><br /><br /><br />
                  <div class="inputfield">
                    <label>Description</label>
                    <input type="text" onChange={handleDescription} class="input" />
                  </div>
                  <input type="submit" value="Delete Home Cover" onClick={handleClick} class="btn" />
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

export default DeleteHomeCover