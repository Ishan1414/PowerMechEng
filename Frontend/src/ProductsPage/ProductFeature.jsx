import React from 'react'
import './ProductFeatures.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import url from '../Url';

function ProductFeature () {
    const[products1, setProducts] = useState([])
  const[isProductFetched , setIsProductFetched] = useState(false) 
 
  useEffect(()=>{
    if(!isProductFetched)
    {
      axios.get(url+"/getProducts/"+localStorage.getItem('modelNum')).then(function(response){
        if(response.status == 200){
          setProducts(response.data)
          setIsProductFetched(true)
          console.log(response.data)
          console.log("products" , products1)
        }
      }).catch(function(error){
        console.log("error",error)
      })
      
    }
    
  }) 
  function countreturn (count){
    if(count % 2 == 0)
  {
    return true;
  }
  else {
    return false;
  }
  }
    
  
    var count = 0;
    return<>
    {/* <div className="margin">
    <div className="features-image">
                    <img src={description.image} alt="" />
                </div>
                <div>
                    <div className="feature-title">
                        <h1>{description.title}</h1>
                    </div>
                    <div className="feature-desc">
                        <p>{description.description}</p>
                    </div>
                </div>
    </div> */}
    {
        (isProductFetched) ? (
            products1.productDescriptions.map(description=>(
                <div className="features-container"> 
                {
                    (countreturn(count++)) ? (
                        <>
                       <div className='features-image'>
                        <img src={description.image} alt="" />
                       </div> 
                       <div style={{marginTop:25}}>
                        <div className="feature-title">
                            <h1>{description.title}</h1>
                        </div>
                        <div className="feature-desc">
                            <p>{description.description}</p>
                        </div>
                       </div>
                       </>
                       
                    ) : (
                        <>
                       
                       <div style={{marginTop:25}}>
                        <div className="feature-title">
                            <h1>{description.title}</h1>
                        </div>
                        <div className="feature-desc">
                            <p>{description.description}</p>
                        </div>
                       </div>
                       <div className='features-image'>
                        <img src={description.image} alt="" />
                       </div> 
                       </>
                    )
                    
                }
                {/* {count++} */}
            </div>
            ))
        ) : (null)
    }
    </>
}

export default ProductFeature