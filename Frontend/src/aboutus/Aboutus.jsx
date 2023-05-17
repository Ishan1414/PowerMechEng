import React ,{ useEffect, useState }from 'react';
import './Aboutus.css';
import Picture from './Picture.js'
import Navbar from '../Navbar/Navbar.jsx'
import QualityPolicy from './QualityPolicy';
import OurMission from './OurMission';
import OurVision from './OurVision';
import Partners from './Partners';
import Footer from '../FooterPage/Footer';

function Aboutus(){
    useEffect(()=>{
        window.scrollTo(0,0);
    })
    return(
    <>
        <Navbar/>
        <div class="backgr-abt-us">
            <Picture/>
        </div>
        
        <section class="content-section" style={{backgroundColor: "#EFF0F6"}}>
            <p class="content-ownerinfo">We are Serving Various Sectors Like Power, Cement, Logistics, Minerals & Several Other Process Industry With Our Best Customized & Pioneered Engineering solutions.
We Are Fully Engaged In Manufacturing Of Bulk Material Handling Equipments, Bag handling And Box Handling Solutions And Many More Material Handling Solutions As per Clients Requirements. By using our products our costumers Achieved Great Results In Saving time, Reducing Labours Ultimately Increase In Productivity And Profit.
We always Think in Favour Of Our Clients, We are moving ahead in the market with a mission to satisfy our customers to the maximum, without making a sacrifice on the quality sphere...
            </p>
        </section>

        <QualityPolicy/>
        <OurMission/>
        <OurVision/>
        
        <Partners/>
        <div>
            <Footer/>
        </div>
    </>)
}
export default Aboutus;