import React, { useEffect, useState } from "react";
import './FeatureCards.css'
import FCard from "./feature-card-comp";
import axios from "axios";
import url from "../Url";
function Feature()
{
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
  let str1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpruhg7D8v04o_YXJMys52p1DgodUH_U-9U27Yfdd7zsQKs2yCsOpg_VrMsGtSoSLpLN8&usqp=CAU"
  let str2 = "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?cs=srgb&dl=pexels-cadeau-maestro-1170412.jpg&fm=jpg"
  
  console.log("sol",solution)
  return(
    <>
    {/* <h1>{solution.description}</h1> */}
    {(isSolutionFetched) ? (
       <div class= "bbody">

    
       {
         solution.solutionFeatures.map((item) =>(
           // <h1>{item.name}</h1>
           <FCard image = {item.icon} description = {item.description} name = {item.name}/> 
         ))
       }
     </div>
    ) : (null)}
  </>
  )


}
export default Feature;

