import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import styles from "../aboutus/Picture.module.css";
import axios from "axios";
import '../Solution/benefit-card-comp.css';
import BCard from "../Solution/benefit-card-comp";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import './solcat.css';
import url from "../Url";
import Footer from "../FooterPage/Footer";
function Solcat() {

    const [solutioncategory, setSolutioncategory] = useState([])
    const [isSolutioncategoryFetched, setIsSolutioncategoryFetched] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        if (!isSolutioncategoryFetched) {
            axios.get(url + "/getsolcategorydetail").then(function (response) {
                if (response.status == 200) {
                    setSolutioncategory(response.data)
                    setIsSolutioncategoryFetched(true)
                    //  localStorage.setItem("solution",solution)
                    console.log(response.data)
                    console.log("solutioncategory", solutioncategory)
                }
            }).catch(function (error) {
                console.log("error", error)
            })
        }
    })
    function handleClick(category, item) {

        var solname = item.title
        console.log("inside handle click")
        localStorage.setItem('solname', solname)
        console.log("solution name", solname)
        navigate('/solution/' + category + "/" + solname);
    }

    return (

        <>
            <Navbar />


            <div>
                <article className={styles.article_abt_us}>
                    <picture className={styles.picture} style={{ filter: "brightness(40%)" }}>
                        <img src={"https://images.pexels.com/photos/5026349/pexels-photo-5026349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="background" class="img-fluid" width={'100%'} />
                    </picture>
                    <h1 className={styles.header} width={'100%'}>Solution Categories</h1>
                </article>

            </div>

            {solutioncategory.map(category => (

                <><br /><br />
                    <div className="categoryh1"><h1>{category.category}</h1></div>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {category.solutions.map(solution1 => (
                            <div >
                                {/* <BCard image = {solution1.coverimg} name = {solution1.title} description = {solution1.description}/> */}
                                <div className="benCard">
                                    <div class="card-bene">
                                        <div class="card-image-bene">
                                            <img src={solution1.coverimg} alt="" />
                                        </div>
                                        <h2>{solution1.title}</h2>
                                        <div className="card-text"><p>{solution1.description}.....
                                        </p></div>

                                        <div style={{ marginLeft: 20 }}>
                                            <button onClick={() => handleClick(category.category, solution1)}>Know More</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        
                    </div>
                </>
            ))}
            <Footer/>
        </>


    )


}
export default Solcat;

