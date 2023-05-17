import React from 'react';
import './ProductForm.css';
import { useState, useEffect } from "react";
import {useForm} from 'react-hook-form';

// function ProductForm() {
//     const {register, handleSubmit, errors} = useForm();
//     return(
//         <div className="form-container">
//             <form>
//                 <h1>Enqurire For Demo</h1>
//                 <div className="ui divider">

//                 </div>
//                 <div className="ui form">
//                     <div className="field">
//                         <label>Name</label>
//                         <input type="text" name="name" placeholder="Full Name" />
//                         <label>Email Id</label>
//                         <input type="email" name="email" placeholder="Email" />
//                         <label>Mobile No</label>
//                         <input type="text" name="mobno" placeholder="Mobile Number" />
//                         <label>City</label>
//                         <input type="text" name="city" placeholder="City" />
//                         <button className="fluid ui button blue">Submit</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }
function ProductForm() {
    const initialValues = { username: "", email: "", mobno: "",city: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value, });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    };
  
    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
      }
    }, [formErrors]);
    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.username) {
        errors.username = "Name is required!";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if(!values.mobno){
        errors.mobno = "Mobile number is required";
      }
      if(!values.city){
        errors.city = "City name is required";
      }
      return errors;
    };
  
    return (
      <div className="form-container">
        {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">Your Request is Submitted!</div>
        ) : (
          <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        )}
   */}
        <form onSubmit={handleSubmit}>
          <h1 className="form-title">Enquire For Demo</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Name</label>
              <input
                type="text"
                name="username"
                placeholder="Name"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.username}</p>
            <div className="field">
              <label className="label" >Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.email}</p>
            <div className="field">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobno"
                placeholder="Mobile Number"
                value={formValues.mobno}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.mobno}</p>
            <div className="field">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formValues.city}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.city}</p>
            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
      </div>
    );
  }
export default ProductForm;