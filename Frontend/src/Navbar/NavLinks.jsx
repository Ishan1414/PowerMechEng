import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { links } from './MyLinks';
import './Navbar.css'
import { Button } from 'reactstrap';
import axios from 'axios';
import url from '../Url';
const NavLinks = () => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const navigate = useNavigate();
    console.log("links", links)

    const [navbar, setNavbar] = useState([])
    const [isNavbarFetched, setIsNavbarFetched] = useState(false)
    function handleClick(category, link) {
        console.log("abcdefg", link)
        localStorage.setItem('solname', link)
        localStorage.setItem('solcategory', category)
        navigate('/solution/' + category + "/" + link);
        window.location.reload();
    }
    useEffect(() => {
   
        if (!isNavbarFetched) {
            axios.get(url + "/getNavbar").then(function (response) {
                if (response.status == 200) {
                    setNavbar(response.data)
                    setIsNavbarFetched(true)
                    // localStorage.setItem("navbar",)
                    console.log(response.data)
                }
            }).catch(function (error) {
                console.log("error", error)
            })
        }
    })
    return (
        <>
            {
                (navbar) ? (
                    navbar.map(link => (
                        <div>
                            <div className="px-3 text-left md:cursor-pointer group">
                                <h1 className="py-7 flex justify-between items-center md:pr-0 pr-5 navbar-links" onClick={() => {
                                    heading !== link.name ? setHeading(link.name) : setHeading("");
                                    setSubHeading("");
                                    navigate(link.mainlink)
                                }}>

                                    {link.name}
                                    {(link.submenu === 'true') ? (<span className="text-xl md:mt-1 md:ml-2 inline">
                                        <ion-icon name={`${heading === link.name ? "chevron-up" : "chevron-down"}`}></ion-icon>
                                    </span>) : (" ")}

                                </h1>

                                {(link.submenu === 'true') && <div className="dropmenu">
                                    <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                        <div className="py-3">
                                            <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                                        </div>
                                        <div className="bg-black p-3.5 grid grid-cols-2">
                                            {(link.sublinks ? (
                                                link.sublinks.map((mysublinks) => (
                                                    <div style={{ marginRight: 20, marginTop: 10 }}>
                                                        <h1 className="text-lg font-semibold text-white" >{mysublinks.head}</h1>
                                                        <hr />
                                                        {
                                                        mysublinks.sublink ? (
                                                            mysublinks.sublink.map(slink => (
                                                                <h1 className="text-sm text-white my-2.5" onClick={() => handleClick(mysublinks.head, slink)}>
                                                                    {slink}
    
                                                                </h1>
    
                                                            ))
                                                        ) : (null)
                                                        }
                                                    </div>
                                                ))
                                            ) : (null))

                                            }
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            {/* Mobile view */}
                            
                           <div className="ulsticky bg-black">
                {link.submenu ==='true' && <div> 
                    <div className={`
                        ${heading === link.name ? 'md:hidden' : 'hidden'}
                    `}>
                            {
                                link.sublinks ? (
                                    link.sublinks.map((mysublinks)=>(
                                        <div>
                                            <h1  onClick={() =>
                                                subHeading !== mysublinks.head
                                                    ? setSubHeading(mysublinks.head)
                                                    : setSubHeading("")
                                                } className="py-4 pl-7 text-white font-semibold md:pr-0 pr-5 flex justify-between md:hidden items-center">{mysublinks.head}
                                                
                                                {link.submenu === 'true'? (<span className="text-xl md:mt-1 md:ml-2 inline">
                            <ion-icon name={`${subHeading===mysublinks.head ? "chevron-up":"chevron-down"}`}></ion-icon>
                        </span>) :(" ")}
                                                
                                                </h1>
                                            <div className={`${
                                                subHeading === mysublinks.head ? 'md:hidden' : 'hidden'
                                            }`}>
                                                {
                                                mysublinks.sublink ? (
                                                    mysublinks.sublink.map((slink)=>(
                                                        <li className="py-3 pl-14 md:hidden text-white" onClick={()=>handleClick(mysublinks.head,slink)}>{slink}</li>
                                                        // <Link to={slink.link}>{slink.name}</Link>
                                                    ))
                                                ) : (null)
                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (null)
                                
                            }
                        
                    </div>
                </div>}
            </div>

                        </div>
                    ))
                ) : (null)

            }
        </>
    )
};

export default NavLinks
