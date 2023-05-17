import React from "react";
import './benefit-card-comp.css'



export class BCard extends React.Component {
	
render(){
	const{image,name,description} = this.props;
	return (
		<div className="benCard">
			<div class="card-bene">
			<div class="card-image-bene">
				<img src={image} alt="" />
			</div>
			<h2>{name}</h2>
			<p>{description}
			</p>
			{/* <div>
				<button>Know More</button>
			</div> */}
			
		</div>
		</div>
	)
}
}
export default BCard;
