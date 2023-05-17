import React from "react";
import Animate1 from './Animate1';
import './Animate2.css';
import './Animations.css';
import './MycssSZ.css';
import './headcontent.css';
const Animate2=()=>{
    return(
        <>
            <div className="animation-container">
                {/* <h1 className="head-content">Our Qualities</h1> */}
                <div >
                    <Animate1/>
                </div>
                <div className="space-anime">

                </div>
                <div>
                <div className='gifs2' >
                            <div className='animedes1' >
                                <video src="https://raw.githubusercontent.com/aditya191201/MAVS_SRC/master/assets/open.mp4" autoPlay loop muted />
                            </div>
                            <div className='animedes1' >
                                <video src="https://raw.githubusercontent.com/aditya191201/MAVS_SRC/master/assets/verify.mp4" autoPlay loop muted />
                            </div>
                    </div>
                    <div className='gifs2' >
                            <div className='animedes1' >
                                <video src="https://raw.githubusercontent.com/aditya191201/MAVS_SRC/master/assets/cloud.mp4" autoPlay loop muted />
                            </div>
                            <div className='animedes1' >
                                <video src="https://raw.githubusercontent.com/aditya191201/MAVS_SRC/master/assets/tickmark.mp4" autoPlay loop muted />
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Animate2;