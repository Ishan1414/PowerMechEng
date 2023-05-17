import './OurMission';
import React from 'react';
const OurMission=()=>{
    return (
    <>
        <div class=" grid lg:grid-cols-2 ExperienceGrid">
            
            <div class=" centered md:auto">
                <h1 class="text-experience"> Our Mission</h1>
                <p class="content-exerience">
                To deliver excellence in Products and Services through establishment of latest Quality Management Systems and production techniques.
                <br/>To add value to every indiviual, organization associated with us.
                <br/>To create working environment based on Principles, Ethics and Values.
                <br/>To encourage Team Effort rather than indiviual performance.
                </p>
            </div>
            <div class=" centered md:auto">
                <img className="years-experience"src="https://raw.githubusercontent.com/Ishan1414/PowerMechEngg/master/aboutusct2.png"/>
            </div>
        </div>
    </>
    );
};
export default OurMission;