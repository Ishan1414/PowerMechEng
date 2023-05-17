import React from "react";
import Counter from "./Counter";
import growthv from '../assets/chart.mp4';
import './Growth1.css';
const Growth1= ()=>
{
    return(
        <>
            <div className="growth-container">

                <div>
                    <Counter/>
                </div>
                <div>
                    <video src={growthv} autoPlay loop muted />
                </div>
            </div>
        </>
    )
}

export default Growth1;