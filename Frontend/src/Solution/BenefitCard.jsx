import React from 'react';
import './BenefitCard.css';
import BCard from './benefit-card-comp'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import url from '../Url';

function Card() {
	const[solution,setSolution] = useState([])
   const[isSolutionFetched, setIsSolutionFetched] = useState(false)
   useEffect(()=>{
      if(!isSolutionFetched)
      {
         axios.get(url+"/getSolutions/"+localStorage.getItem('solname')).then(function(response){
        if(response.status == 200){
          setSolution(response.data)
          setIsSolutionFetched(true)
         //  localStorage.setItem("solution",solution)
          console.log(response.data)
          console.log("solution" , solution)
        }
      }).catch(function(error){
        console.log("error",error)
      })
      }
   })
return(
<body >
    {(isSolutionFetched) ? (
      <div class="mainC" style={{ display: "flex", flexWrap: "wrap",justifyContent:"center"}} >
			

      {/* <BCard/>
<BCard/>
<BCard/>
<BCard/> */}

{solution.solutionBenefits.map((benefit)=>(
 <BCard image = {benefit.icon} name = {benefit.name} description = {benefit.description}/>
))}



</div>
    ) : (null)}
		

</body>
)
}
export default Card;