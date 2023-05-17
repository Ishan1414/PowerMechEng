import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Button} from 'reactstrap';
import Example from './Example';
import Solution from './Solution/Solution'
import ProductData from './ProductsPage/ProductData';
import ProductPage from './ProductsPage/ProductPage';
import Solcat from './Solcat/Solcat';

import MultiItemCarousel1 from './ProductCategory/ProductCategory';
import ImageSlider from './ProductsPage/ImageSlider';
import Home1 from './Home/MainHomePage';
import ProductForm from './ProductsPage/ProductForm';
import AddSolution from './Admin/AddSolution';
import AddAdmin from './Admin/AddAdmin';
import {getCookie, setCookie} from './Cookies';
import url from './Url';
function App() {
  const navigate = useNavigate()
  const[products, setProducts] = useState([])
  const[isProductFetched , setIsProductFetched] = useState(false) 
  useEffect(()=>{
    if(!isProductFetched)
    {
      axios.get(url+"/getSolutions/Interactive Training Rooms").then(function(response){
        if(response.status == 200){
          setProducts(response.data)
          setIsProductFetched(true)
          console.log(response.data)
          console.log("products" , products)
        }
      }).catch(function(error){
        console.log("error",error)
      })
      axios.get("http://localhost:8080"+"/refresh-token",{
        headers:{
          "Authorization":"Bearer "+getCookie("token"),
          "isRefreshToken":"true"
        }
      }).then(function(response){
        if(response.status==200){
          // console.log("In refresh token")
          setCookie("token",response.data.token,20);
          // setIsCategoryDisplayFetched(true);
          // console.log("Token",response.data.token);
      }
      
    }).catch(function(error){
        console.log("error");
    
      })
      // axios({
      //   method:"get",
      //   url : "http://localhost:8080/get-products"
      // }).then(function(response){
      //   if(response.status == 200){
      //     setProducts(response.data)
      //     setIsProductFetched(true)
      //   }
      // }).catch(function(error){
      //   console.log("error" , error)
      // })
    }
  }) 
  
  const handleClick = () =>{
    navigate('/trial')
  }
  return (
    // <div className="App">
    //   {
    //     products.map(index=>{
    //       return(
    //         <>
    //         <h1>{index.productName}</h1>
    //         <Button onClick = {handleClick}>Click Me</Button>
    //         </>
    //       )
    //     })
    //   }
    // </div>
    <>
    {/* <h1>{products.title}</h1>
    <h2>{products.description}</h2> */}
    {/* <Home1/> */}
    {/* <AddSolution/> */}
    <AddAdmin/>
    {/* <ProductData/>
    <ProductMain/> */}
   {/* <ProductPage/> */}
   {/* <Solcat/> */}
  {/* <ProductForm/> */}
   {/* <MultiItemCarousel1/> */}
    {/* <ContactSection/> */}
    {/* <NewTrial/> */}
    {/* <ImageSlider/> */}
    </>
    
  );
}

export default App;
