import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import url from '../Url';

function ProductData(){
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
  localStorage.setItem("products1",JSON.stringify(products1))
  console.log("image",products1.productImage1)
}

export default ProductData;