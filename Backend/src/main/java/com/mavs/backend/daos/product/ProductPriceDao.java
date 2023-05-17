package com.mavs.backend.daos.product;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mavs.backend.entities.product.ProductPrice;

public interface ProductPriceDao extends MongoRepository<ProductPrice, String> {
    public ProductPrice findProductByProductName(String productName);
    
}
