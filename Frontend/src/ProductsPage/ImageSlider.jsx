import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './newtrial.css';
import './ProductPage.css';
function ImageSlider() {
    const [isFetched,setIsFetched] = useState(false)
    const imgs=[
      {id:0, value: localStorage.getItem("img")},
      {id:1, value: localStorage.getItem("image2")},
      {id:2, value: localStorage.getItem("image3")},
      
    ]

    
    
    // (imgs[0] != null) ? (setIsFetched(true)) :(null)
    
    console.log("img in Image SLider",localStorage.getItem("img"))
    const [wordData,setWordData]=useState(localStorage.getItem("image1"))
    // const [wordData,setWordData] = useState();
    const [check,setCheck] = useState(false)

    



    useEffect(()=>{
      if(!check){
        console.log("In check:",localStorage.getItem("img"))
        const wordSlider = imgs[0];
        setWordData(wordSlider)
        setCheck(true)
      }
    })
    
    const handleClick=(index)=>{
      console.log("handle click index:",index)
      const wordSlider=imgs[index];
      setWordData(wordSlider)
    }
    // if(imgs[0]!= null)
    // {
    //     setIsFetched(true)
    // }
    console.log("abc",wordData.value);
    console.log("xyz",localStorage.getItem("image1"))
    return (
        <>
        
      <div className="app">
        <div className="details">
          <div className="div-bigimg">
          {(imgs[0]!=null) ? (<img src={wordData.value} className="big-img" /> ) : (<img src={wordData} className="big-img" /> )}
          </div>
            
        
        <div className='flex_row'>
          {imgs.map((data,i)=>
          <div className="thumbnail" key={i} >
            <img className={wordData.id==i?"clicked":""} src={data.value} onClick={()=>handleClick(i)} height="70" width="100" />
          </div>
          )}
        </div>
        
        </div>
        <div className="row">
            <h1>{localStorage.getItem("productname")}</h1>
        </div>
      </div>
      </>
    );
  }

  export default ImageSlider;