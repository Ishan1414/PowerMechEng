import React from 'react'

import Main from './Main';
import "./MycssSZ.css";
import SolCard from './SolutionCard';
import Videotxt from './videotxtSZ';
import "./solncontent.css";
import Counter from './Counter';
// import Footer from '../FooterPage/Footer';
// import Counter from './Counter';
import Animate2 from './Animate2';
import ContentSZ from './content-home';
import Navbar from '../Navbar/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import { setCookie ,getCookie} from '../Cookies';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import  Brightness1  from '@mui/icons-material';
import url from '../Url';
import Footer from '../FooterPage/Footer';
import ProductCard from './ProductCard';
function Home1() {
  const navigate = useNavigate()
  const [homeCover, setHomeCover] = useState([])
  const [isHomeCoverFetched, setIsHomeFetched] = useState(false)
  const [homeCover1, setHomeCover1] = useState([])
  const [isHomeCoverFetched1, setIsHomeFetched1] = useState(false)
  useEffect(() => {
    axios.get(url + "/refresh-token", {
      headers: {
        "Authorization": "Bearer " + getCookie("token"),
        "isRefreshToken": "true"
      }
    }).then(function (response) {
      if (response.status == 200) {
        // console.log("In refresh token")
        setCookie("token", response.data.token, 20);
        // setIsCategoryDisplayFetched(true);
        // console.log("Token",response.data.token);
      }

    }).catch(function (error) {
      console.log("error");
    })
    if (!isHomeCoverFetched) {
      axios.get(url + "/getAchievements").then(function (response) {
        if (response.status == 200) {
          setHomeCover(response.data)
          setIsHomeFetched(true)
          console.log(response.data)
          console.log("products", homeCover)
        }
      }).catch(function (error) {
        console.log("error", error)
      })

    }
    if (!isHomeCoverFetched1) {
      axios.get(url + "/getCompanyDescription").then(function (response) {
        if (response.status == 200) {
          setHomeCover1(response.data)
          setIsHomeFetched1(true)
          console.log(response.data)
          console.log("home description", homeCover1)

        }
      }).catch(function (error) {
        console.log("error", error)
      })
    }
  })
  return (
    <>

      <Navbar />
      <Main />
      <Videotxt />
      <Animate2 />
      {/* {homeCover1.map(cover=>(
      <div>
        {cover.title} : {cover.description}
      </div>
    ))} */}
      {
        homeCover1[0] ? (
          <ContentSZ title={homeCover1[0].title} description={homeCover1[0].description} />
        ) : (null)
      }

      {/* 
      <ContentSZ title = {homeCover1[0].title} description = {homeCover1[0].description}/> */}
      {/* <ContentSZ description={homeCover1} */}
      <div style={{ backgroundImage: `url("https://images.pexels.com/photos/2253595/pexels-photo-2253595.jpeg?auto=compress&cs=tinysrgb&w=1800")`, marginTop: 50 }}>
        <h1 className="soln-content">Solutions</h1>
        <SolCard />
      </div>
      {
        (homeCover1[1]) ? (
          <ContentSZ title={homeCover1[1].title} description={homeCover1[1].description} />
        ) : (null)
      }
      <div style={{ marginTop: 50 }}>
        <h1 className='head-content'>Our Growth</h1>
        <Counter />
      </div>

      <div className='product-home' style={{ backgroundImage: `url("https://images.pexels.com/photos/2569839/pexels-photo-2569839.jpeg?auto=compress&cs=tinysrgb&w=1800")`, opacity: 0.9 }}>
        <h1 className="soln-content">Products</h1>
        <ProductCard />
      </div>
      {
        (homeCover1[2]) ? (
          <ContentSZ title={homeCover1[2].title} description={homeCover1[2].description} />
        ) : (null)
      }
      

      <div>
        <Footer />
      </div>

    </>


  )
}

export default Home1; 