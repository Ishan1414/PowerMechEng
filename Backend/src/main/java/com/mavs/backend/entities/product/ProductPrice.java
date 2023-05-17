package com.mavs.backend.entities.product;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@Document(collection = "productPrice")
@Component
public class ProductPrice {

    @Id
    private Integer id;

    private String productName;

    private String productPrice;

    public ProductPrice() {}

    public ProductPrice(String productName, String productPrice) {
        this.productName = productName;
        this.productPrice = productPrice;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(String productPrice) {
        this.productPrice = productPrice;
    }

}    