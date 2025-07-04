package com.mavs.backend.controllers.product;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mavs.backend.helper.ExcelHelper;
import com.mavs.backend.helper.ResponseMessage;
import com.mavs.backend.services.product.ProductService;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    public ProductService productService;

    @Autowired
    public ResponseMessage responseMessage;

    @Autowired
    public ExcelHelper excelHelper;

    @PostMapping("/product-price")
    public ResponseEntity<?> predictPrice(@RequestParam("productName") String productName, @RequestHeader("Authorization") String authorization) {
        try {
            return productService.predictPrice(productName, authorization);
        } catch (Exception e) {
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }
    
    @PostMapping("/add-product")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> addProduct(@RequestParam("modelNumber") String modelNumber,@RequestParam("productName") String productName,@RequestParam("productHighlights") String productHighlights,@RequestParam("productPrice") String productPrice,@RequestParam("productImage1") String productImage1,
    @RequestParam("productImage2")String productImage2,@RequestParam("productImage3") String productImage3,@RequestParam("videoLink") String videoLink,@RequestParam("productCategory") String productCategory,@RequestHeader("Authorization") String authorization,@RequestParam("brochureLink") String brochureLink){
        try{
            return productService.addProductDetail(modelNumber, productName, productHighlights, productPrice, productImage1, productImage2, productImage3, videoLink, productCategory, authorization,brochureLink);
        }
        catch(Exception e){
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/delete-products")
    public ResponseEntity<?> deleteAllProducts(@RequestHeader("Authorization") String authorization){
        try {
            return productService.deleteAllProducts(authorization);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }

    }

    @DeleteMapping("/deleteProductsById/{modelNumber}")
    public ResponseEntity<?> deleteProductsById(@RequestHeader("Authorization") String authorization, @PathVariable("modelNumber") String modelNumber){
        try {
            return  productService.deleteProductsById(authorization,modelNumber);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @GetMapping("/get-products")
    public ResponseEntity<?> getProducts(){
        try {
            return productService.getProducts();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @GetMapping("getProducts/{model}")
    public ResponseEntity<?> getProductById(@PathVariable("model") String model){
        try {
            return productService.getProductById(model);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/description/{modelNumber}")
    public ResponseEntity<?> addDescription(@RequestHeader("Authorization") String authorization,@PathVariable("modelNumber") String modelNumber,@RequestParam("title") String title, @RequestParam("description") String description,@RequestParam("image") String image){
        try {
            return productService.addDescription(authorization, modelNumber, title, description, image);
        } catch (Exception e) {
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/deleteDescription/{modelNumber}/{title}")
    public ResponseEntity<?> deleteDescription(@RequestHeader("Authorization") String authorization,@PathVariable("modelNumber") String modelNumber,@PathVariable("title") String title){
        try {
            return productService.deleteDescription(authorization,modelNumber,title);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/deleteAdditionalFeatures/{modelNumber}/{title}")
    public ResponseEntity<?> deleteAdditionalFeatures(@RequestHeader("Authorization") String authorization,@PathVariable("modelNumber") String modelNumber,@PathVariable("title") String title){
        try {
            return productService.deleteAdditionalFeatures(authorization, modelNumber, title);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/additionalfeatures/{modelNumber}")
    public ResponseEntity<?> addAdditionalFeatures(@RequestHeader("Authorization") String authorization,@PathVariable("modelNumber") String modelNumber,@RequestParam("title") String title,@RequestParam("description") String description){
        try {
            return productService.addAditionalFeatures(authorization, title, description, modelNumber);
        } catch (Exception e) {
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/specifications/{modelNumber}")
    public ResponseEntity<?> addProductSpecifications(@RequestHeader("Authorization") String authorization, @RequestBody HashMap<String,HashMap<String,String>> subItems,@PathVariable("modelNumber") String modelNumber){
        try {
            return productService.addProductSpecifications(authorization,modelNumber,subItems);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/productspecs/{modelNumber}")
    public ResponseEntity<?> addProductSpecs(@RequestHeader("Authorization") String authorization,@PathVariable("modelNumber") String modelNumber,@RequestParam("head") String head, @RequestParam("key") String key,@RequestParam("value") String value){
        try {
            return productService.addProductSpecs(authorization,modelNumber,head,key,value);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/deleteProductSpecs/{modelNumber}/{head}")
    public ResponseEntity<?> deleteProductSpecs(@RequestHeader("Authorization") String authorization,@PathVariable("modelNumber") String modelNumber,@PathVariable("head") String head){
        try {
            return productService.deleteProductSpecs(authorization,modelNumber,head);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/productcategory")
    public ResponseEntity<?> addProductCategory(@RequestHeader("Authorization") String authorization,@RequestParam("productcategory") String productcategory,@RequestParam("modelNum") String modelNum){
        try {
            return productService.addProductCategory(authorization, productcategory, modelNum);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }

    }

    @GetMapping("/getproductcategory")
    public ResponseEntity<?> getProductCategory(){
        try {
            return productService.getProductCategory();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);

        }
    }

    @PostMapping("/excel/products")
    public ResponseEntity<?> addExcelProducts(@RequestParam("file") MultipartFile file){
        try {
            return excelHelper.addExcelProducts(file.getInputStream());
        } catch (Exception e) {
            // e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/excel/productcategory")
    public ResponseEntity<?> addExcelProductCategory(@RequestParam("file") MultipartFile file){
        try {
            return excelHelper.addExcelProductCategory(file.getInputStream());
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/delete-productcategory")
    public ResponseEntity<?> deleteProductCategories(@RequestHeader("Authorization") String authorization){
        try {
            return productService.deleteProductCategories(authorization);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/deleteProductCategory/{productcategory}")
    public ResponseEntity<?> deleteProductCategoryByName(@RequestHeader("Authorization") String authorization,@PathVariable("productcategory") String productcategory){
        try {
            return productService.deleteProductCategoryByName(authorization, productcategory);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }


}
