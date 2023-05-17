import React, { useEffect, useState } from "react";
import { Table, Row } from 'react-bootstrap';

function ProductSpecification({ title, product }) {
    // console.log("productInfo",product.productInformation);
    // console.log("title",title)



    const [key, SetKeys] = useState([]);
    const [value, SetValues] = useState([]);
    const [isKeysFetched, SetIsKeysFetched] = useState(false);
    useEffect(() => {
        if (!isKeysFetched) {
            for (var k in product.productSpecifications[title]) {
                key.push(k);
            }
            SetIsKeysFetched(true);
        }
    })

    return (

        <div style={{ borderBottom: '1px solid rgb(226, 226, 226)', fontFamily: 'Roboto',
        fontStyle:'normal', fontWeight: '600', fontSize:'20px'}}>
            <h4>{title.substring(0, title.length)}</h4>
            <Table borderless>
                {
                    (isKeysFetched) ? (
                        key.map((k) => {
                            return (
                                <>
                                    <tr>
                                        <td style={{
                                            fontFamily: 'Roboto',
                                            fontStyle: 'normal',
                                            fontWeight: '600',
                                            fontSize: '16px',
                                            lineHeight: '18px',
                                            letterSpacing: '0.02em',
                                            
                                            color: '#878787',
                                            width: '250px'
                                        }}>
                                            <p className="tablep">{k}</p>
                                        </td>
                                        <td style={{
                                            fontFamily: 'Roboto',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: '16px',
                                            lineHeight: '18px',
                                            letterSpacing: '0.02em',
                                            marginLeft: '20px',
                                            color: '#212121'
                                        }}>
                                            <p >
                                                {product.productSpecifications[title][k]}
                                            </p>
                                        </td>
                                    </tr>



                                    {/* <p><b>{k}<span> </span></b>:<span> </span>{product.productInformation[title][k]}</p> */}
                                </>
                            );
                        })
                    ) : (
                        null
                    )
                }
            </Table>
        </div>
    );
}

export default ProductSpecification;