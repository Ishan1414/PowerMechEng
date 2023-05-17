import React from 'react';
import './Counter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faPerson, faCloud, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import './Growth1.css';
import CountUp from 'react-countup';
import { useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import url from '../Url';
import axios from 'axios';
import { useEffect } from 'react';
function Counter(){
    const [counterOn, setCounterOn] = useState(false);
    const [counter, setCounter] = useState([]);
    const[display, setDisplay] = useState(false);
  const [isCounterFetched, setIsCounterFetched] = useState(false)
  useEffect(() => {
    if (!isCounterFetched) {
      axios.get(url+"/getCount").then(function (response) {
        if (response.status == 200) {
          setCounter(response.data)
          setDisplay(true)
          setIsCounterFetched(true)
          console.log(response.data)
          console.log("counters", counter)
        }
      }).catch(function (error) {
        console.log("error", error)
      })
    }
  })

    return (
        <>  
        {(display) ? (
            <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
        <div className="counter-container">
            <div className="counter-row">
                <div className="counter-col">
                    <FontAwesomeIcon icon={faPerson} className="counter-icon"/>
                    <br />
                    {counterOn && <CountUp start={0} end={counter[0].count} duration= {2} delay={0}/>}+
                    <h4 >{counter[0].parameter}</h4>
                </div>
                <div className="counter-col">
                    <FontAwesomeIcon icon={faListCheck} className="counter-icon"/>
                    <br />
                    {counterOn && <CountUp start={0} end={counter[1].count} duration= {2} delay={0}/>}+
                    <h4>{counter[1].parameter}</h4>
                </div>
                <div className="counter-col">
                    <FontAwesomeIcon icon={faCloud} className="counter-icon"/>
                    <br />
                    {counterOn && <CountUp start={0} end={counter[2].count} duration= {2} delay={0}/>}+
                    <h4>{counter[2].parameter}</h4>
                </div>
                <div className="counter-col">
                    <FontAwesomeIcon icon={faCartShopping} className="counter-icon"/>
                    <br />
                    {counterOn && <CountUp start={0} end={counter[3].count} duration= {2} delay={0}/>}+
                    <h4>{counter[3].parameter}</h4>
                </div>
                <div >
                         <video className="growthVid"src="https://raw.githubusercontent.com/aditya191201/MAVS_SRC/master/assets/chart.mp4" autoPlay loop muted />
                </div>
            </div>
           
        </div>
        </ScrollTrigger>
        ): (null)}
        
        
        
        
        </>
    )
}

export default Counter;