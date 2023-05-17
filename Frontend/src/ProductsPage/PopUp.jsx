import React from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import './ProductPage.css';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './PopUp.css';
import { faIndianRupee} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PopUp = () => {
    let name = localStorage.getItem("productname")
    const form = useRef();

    const sendEmail = (e) =>{
        e.preventDefault();
        emailjs.sendForm('service_tei42ii', 'template_8vjorvu', form.current, 'q3-bs_rjke0pVJUD9')
            .then((result) => {
                console.log(result.text);
                toast('Email Sent Successfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    e.target.reset();
            }, (error) => {
                console.log(error.text);
                console.log("error in sending email")
            });

    };
    return (
        <div>
            {/* <h4>Popup - GeeksforGeeks</h4> */}
            <Popup trigger=
                {<button className="insidebutton" style={{marginLeft:"10px"}}>
                    <FontAwesomeIcon icon = {faIndianRupee}  style={{ fontSize: '30px', marginRight: '10px', marginTop: '10px' }} />
                     Request Quotation
                     </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div>
                                <h1 style={{fontWeight: "600", fontSize:"20px", textAlign:"center"}}>Request Quotation</h1>
                            </div>
                            <div>
                                {/* ref={form} onSubmit={sendEmail} */}
                                <form ref={form} onSubmit={sendEmail}>
                                    <input type="text" name="user_name" placeholder='Name' />
                                    <input type="email" name="user_email" placeholder='Email' />
                                    <input type="text" name="product" placeholder='Product' value={name} />
                                    <textarea name="message" placeholder='Comment'></textarea>
                                    <button type='submit' value="send" className='site-btn'>Send Message</button>
                                </form>
                            </div>
                            <div>
                                {/* <button onClick=
                                    {() => close()}>
                                    Close modal
                                </button> */}
                            </div>
                        </div>
                    )
                }
                
            </Popup>
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
        </div>

    )
}

export default PopUp;


