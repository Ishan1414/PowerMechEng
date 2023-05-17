import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Available_implementation_Carousel.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan,faLessThan } from "@fortawesome/free-solid-svg-icons";
import url from "../Url";
const PreviousBtn = (props) => {

  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon= {faLessThan} style={{ color: "blue", fontSize: "30px" }} className="carouselicon"/>
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faGreaterThan} style={{ color: "blue", fontSize: "30px" }} className = "carouselicon" />
    </div>
  );
};

const Carousel = () => {
  
const[solution,setSolution] = useState([])
const[isSolutionFetched, setIsSolutionFetched] = useState(false)
useEffect(()=>{
   if(!isSolutionFetched)
   {
      axios.get(url+"/getSolutions/"+localStorage.getItem('solname')).then(function(response){
     if(response.status == 200){
       setSolution(response.data)
       setIsSolutionFetched(true)
       console.log(response.data)
       console.log("solution" , solution)
     }
   }).catch(function(error){
     console.log("error",error)
   })
   }
})
  return (
    <div style={{ margin: "30px" }} className="carousel">
      <Slider
        autoplay
        autoplaySpeed={2000}
        // dots
        initialSlide={2}
        infinite
        prevArrow={<PreviousBtn />}
        nextArrow={<NextBtn />}
        customPaging={(i) => {
          return (
            <div>
              {/* <img
                src={data[i]}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              /> */}
            </div>
          );
        }}
        dotsClass="slick-dots custom-indicator"
      >
        {/* {data.map((item) => (
          <div>
            <img src={item} alt="" style={{ width: "100%", height: "100%" }} />
          </div>
        ))} */}
        <div>
            <img src={solution.solimg1} alt="" style={{ width: "100%", height: "100%" }} />
          </div>
          <div>
            <img src={solution.solimg2} alt="" style={{ width: "100%", height: "100%" }} />
          </div>
          <div>
            <img src={solution.solimg3} alt="" style={{ width: "100%", height: "100%" }} />
          </div>
      </Slider>
    </div>
  );
};

export default Carousel;