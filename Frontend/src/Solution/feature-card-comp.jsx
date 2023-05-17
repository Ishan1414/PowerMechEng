import React from "react";
import './feature-card-comp.css'

export class FCard extends React.Component
{
  render(){
const {image,description, name} = this.props;
return(
<div class = "ccontainer">
    <div class = "ccard">
      <div class = "imgbox">
        <img href = "#" src = {image}/>
      </div>
      <div class = "ccontent">
        <h1 style={{ fontSize: "20px"  }}>{name}</h1>
        <p>{description}</p>
      </div>
    </div>    
  </div>
  


)
}
}
export default FCard;