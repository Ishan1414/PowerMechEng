import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import url from '../Url'

function NavTrial(){
    const[products1, setProducts] = useState([])
    const[isProductFetched , setIsProductFetched] = useState(false) 
    
    useEffect(()=>{
      window.scrollTo(0,0)
      if(!isProductFetched)
      {
        axios.get(url+"/getNavbar").then(function(response){
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
    return(
        <>
            {products1.map(nav=>(
                <div>
                    <h1>{nav.name}</h1>
                    <h2>{nav.mainlink}</h2>
                    {/* <h2>{nav.sublinks}</h2> */}
                    {/* {(nav.submenu)?(<>yes</>): (<>no</>)} */}
                    {(nav.sublinks!= null) ? (nav.sublinks.map(link=>(
                      <div>
                        {link.head}
                        {link.sublink.map(slink=>(
                          <div>{slink}</div>
                        ))}
                      </div>
                      
                    ))  ) : (null)}
                                     
                </div>
                
                
            ))}
        
        </>
    )
   
}

export default NavTrial