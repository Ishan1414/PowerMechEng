import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AddSolution.css';
import { setCookie } from '../Cookies';
import AdminNavbar from './Admin Navbar/AdminNavbar';
import url from '../Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var excel = ""
function AddSolutionCategoryExcel() {
  const [selectedsolutionFile, setSelectedSolutionFile] = useState();
  const [isSolutionFilePicked, setIsSolutionFilePicked] = useState(false);
  var isLogin = localStorage.getItem("login")
  const SolutionFileHandler = (event) => {
    setSelectedSolutionFile(event.target.files[0]);
    setIsSolutionFilePicked(true);
  };
  const handleSolutionsFileSubmission = () => {
    const formData = new FormData();

    formData.append('file', selectedsolutionFile);
    console.log("Form Data", formData)
    alert("Submit Clicked")

    axios.post(url + "/excel/solcategory", formData, {


    }).then(function (response) {
      console.log(response.data)
      console.log("okay")
      toast('Solution Category Excel Added Successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }).catch(function (error) {
      console.log("Error in product Category");
      // toast.warn("Error In Fetching orders",error)

    })


  };


  return (
    <>
      {
        (isLogin == "true") ? (<>
          <AdminNavbar />
          <div className="form-contain">
            <div className="wrapper-form">
              <div className="title-form">
                Upload Your Solution Category Excel Datasheet here
              </div>
              <div className="form-1">
                <div class="inputfield">
                  <label>Excel File</label>
                  <input type="file" name="file" accept=".xlsx, .xls, .csv" onChange={SolutionFileHandler} class="input" />
                </div>

                <div class="inputfield">
                  <input type="submit" value="Register" onClick={handleSolutionsFileSubmission} class="btn" />
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
          </div></>) : (<><h1>Error: Not Logged IN</h1></>)
      }

    </>
  )
}
export default AddSolutionCategoryExcel;