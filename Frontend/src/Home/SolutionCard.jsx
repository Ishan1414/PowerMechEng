import React from 'react'
import { useNavigate } from 'react-router-dom';
import './solcard.css';

const SolCard = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/solutioncategory")
    }

    return (
        <div className='solution' >
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>

            <a onClick={handleClick} class="card education" style={{cursor: "pointer"}}>
                <div className='card-image1'>
                    <img src='https://images.pexels.com/photos/1659748/pexels-photo-1659748.jpeg?auto=compress&cs=tinysrgb&w=600' />
                </div>

                <p>Solution 1</p>
            </a>
            <a onClick={handleClick} class="card credentialing" style={{cursor: "pointer"}}>
                <div className='card-image1'>
                    <img src='https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=600' />
                </div>
                <p>Solution 2</p>
            </a>
        </div>
    )
}

export default SolCard;