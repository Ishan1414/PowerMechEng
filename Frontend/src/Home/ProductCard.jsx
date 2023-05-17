import React from 'react'
import { useNavigate } from 'react-router-dom';
import './solcard.css';

const ProductCard = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/productcategory")
    }

    return (
        <div className='solution' >
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>

            <a onClick={handleClick} class="card education" style={{cursor: "pointer"}}>
                <div className='card-image1'>
                    <img src='https://teeyer-aacline.com/product/1-2-4-bucket-elevator_01b.jpg' />
                </div>

                <p>Bucket Elevators</p>
            </a>
            <a onClick={handleClick} class="card credentialing" style={{cursor: "pointer"}}>
                <div className='card-image1'>
                    <img src='https://cpimg.tistatic.com/07946430/b/4/Screw-Conveyors.jpg' />
                </div>
                <p>Screw Conveyors</p>
            </a>

            <a onClick={handleClick} class="card wallet" style={{cursor: "pointer"}}>
                <div className='card-image1'>
                    <img src='https://tiimg.tistatic.com/fp/2/006/278/3000w-roller-structure-belt-conveyor-with-load-capacity-of-30-long-ton-823.jpg' />
                </div>

                <p>Belt Conveyors</p>
            </a>
        </div>
    )
}

export default ProductCard;