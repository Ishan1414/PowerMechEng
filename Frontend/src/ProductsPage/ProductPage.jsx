import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Footer from '../FooterPage/Footer';
import Navbar from '../Navbar/Navbar';
import url from '../Url';
import DownloadBroucher from './DownloadBroucher1';
import ImageSlider from './ImageSlider';
import ProductData from './ProductData';
import ProductFeature from './ProductFeature';
import './ProductPage.css';
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from 'react-bootstrap/esm';
import ProductSpecification from './ProductSpecification';
import PopUp from './PopUp';
var title1 = ""
function ProductPage() {
  const [products1, setProducts] = useState([])
  const [isProductFetched, setIsProductFetched] = useState(false)
  const [keys, SetKeys] = useState([]);
  const [isKeysFetched, setIsKeysFetched] = useState(false);
  const [isProductSpecificationSet, setIsProductSpecificationSet] = useState(false);
  var productSpecifications;


  useEffect(() => {
    window.scrollTo(0, 0)
    if (!isProductFetched && !isKeysFetched && !isProductSpecificationSet) {
      axios.get(url + "/getProducts/" + localStorage.getItem('modelNum')).then(function (response) {
        if (response.status == 200) {
          setProducts(response.data)
          setIsProductFetched(true)
          console.log(response.data)
          console.log("products", products1)
          productSpecifications = response.data.productSpecifications
          for (var k in response.data.productSpecifications) {
            keys.push(k.split('').reverse().join(''));
          }
          keys.sort();
          setIsProductSpecificationSet(true);
          setIsKeysFetched(true)

        }
      }).catch(function (error) {
        console.log("error", error);

      })

    }

  })



  localStorage.setItem("product", JSON.stringify(products1))

  localStorage.setItem("image1", "" + products1.productImage1)
  console.log("image1", localStorage.getItem("image1"))
  localStorage.setItem("image2", products1.productImage2)
  localStorage.setItem("image3", products1.productImage3)
  localStorage.setItem("productname", products1.productName)
  console.log("features", products1.additionalFeatures)
  console.log("image abcd", localStorage.getItem("image1"))

  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  return (
    <>
      <Navbar />
      <ProductData />

      {/* <ProductMain/> */}
      {/* <NewTrial/> */}
      <div className="product-total">
        <ImageSlider />
        <div>
          <div className="product_desc">
            <p>
              {products1.productHighlights}
            </p>
          </div>
        </div>
        <div className="section-container">
          <div className="columns image1">
            <img src={products1.productImage1} alt="" />
          </div>
          {(isProductFetched) ? (
            <div className="producthigh">
              <h1>Product Highlights</h1>
              {
                products1.additionalFeatures.map(feature => (
                  <div className="productdesc1">
                    <h2>
                      <span style={{ fontWeight: '600' }}>{feature.title}</span> : <span>{feature.description}</span>
                    </h2>
                  </div>
                ))
              }
            </div>
          ) : (null)}
        </div>
        <br />
        <br />
        {/* <div className="youtube-container">
        <iframe width="560" height="315" src={products1.productVideoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         <br />
         <br />
        </div> */}
        <ProductFeature />
        <div>
          <div className="download-broucher">

            <button onClick={() => { downloadFileAtURL(products1.brochureLink) }}>
              <FontAwesomeIcon icon={faFile} style={{ fontSize: '30px', marginRight: '10px', marginTop: '10px' }} />
              Download Broucher</button>
            <PopUp/>
          </div>
        </div>
        <div>
          <Row>
            {/* <h4 className="rowtitle">Model Number: <b>{product.modelNumber}</b> </h4> */}
            <Row style={{ borderBottom: '1px solid #E2E2E2' }} className="producthigh1">
              <h2>Specifications</h2>
            </Row>
            <div className='specsrow'>
              <Row>
                {
                  (isKeysFetched) ? (
                    keys.map(k => {
                      return (

                        <ProductSpecification title={k.split('').reverse().join('')} product={products1} />

                      );
                    })

                  ) : (
                    null
                  )
                }
              </Row>
            </div>

          </Row>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default ProductPage;