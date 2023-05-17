import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../FooterPage/Footer";
import Navbar from "../Navbar/Navbar";
import './Blog.css';
function Blog(){
const navigate = useNavigate();
    return (
           <>
           <Navbar/>
           <div className="main-blog">
             <div className="blog-post">
                  <div className="blog-post__img">
                    <img src="https://www.dgicommunications.com/wp-content/uploads/2018/03/DSC_2917.jpg" alt="" />
                  </div>
                  <div className="blog-post__info">
                    <div className="blog-post__date">
                        <span>December 22, 2022</span><br />
                        <span> Author: Sushil Oswal</span>
                    </div>
                    <h1 class="blog-post__title">AV Industry</h1>
                    <p class="blog-post__text">
                    As the demand for high-quality video increases, manufacturers are developing conference room systems with 4K and even 8K resolution. This allows for clearer and more lifelike video, making remote meetings feel more like in-person gatherings.
                    </p>
                    <a onClick={()=>navigate('/blog-main')} className="blog-post__cta">Read more</a>
                  </div>

             </div>
             
             </div>
           <div className="main-blog">
             <div className="blog-post">
                  <div className="blog-post__img">
                    <img src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                  </div>
                  <div className="blog-post__info">
                    <div className="blog-post__date">
                        <span>December 20, 2022</span><br />
                        <span> Author: Sushil Oswal</span>
                    </div>
                    <h1 class="blog-post__title">Current AV Trends</h1>
                    <p class="blog-post__text">
                    Many organizations are moving away from on-premises audio and video conferencing systems and opting for cloud-based solutions. This allows for greater flexibility and scalability, as well as reduced costs for hardware and maintenance.
                    </p>
                    <a className="blog-post__cta">Read more</a>
                  </div>

             </div>
             
             </div>
             
            <Footer/>
             
           </>  

    )
}

export default Blog;