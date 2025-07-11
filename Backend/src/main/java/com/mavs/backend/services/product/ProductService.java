package com.mavs.backend.services.product;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.mavs.backend.daos.admin.AdminDao;
import com.mavs.backend.daos.product.ProductCategoryDao;
import com.mavs.backend.daos.product.ProductDao;
import com.mavs.backend.daos.product.ProductPriceDao;
import com.mavs.backend.daos.solution.SolutionDao;
import com.mavs.backend.entities.admin.Admin;
import com.mavs.backend.entities.product.AdditionalFeatures;
import com.mavs.backend.entities.product.Product;
import com.mavs.backend.entities.product.ProductCategory;
import com.mavs.backend.entities.product.ProductDescription;
import com.mavs.backend.entities.product.ProductPrice;
import com.mavs.backend.entities.product.ProductSpecifications;
import com.mavs.backend.entities.product.SpecificationDetails;
import com.mavs.backend.entities.solution.Solution;
import com.mavs.backend.helper.JwtUtil;
import com.mavs.backend.helper.ProductCategoryModelsResponse;
import com.mavs.backend.helper.ProductCategoryResponse;
import com.mavs.backend.helper.ProductsDetailsResponse;
import com.mavs.backend.helper.ResponseMessage;

@Repository
@Component
public class ProductService {

    @Autowired
    public ProductDao productDao;

    @Autowired
    public ResponseMessage responseMessage;

    @Autowired
    public JwtUtil jwtUtil;

    @Autowired
    public AdminDao adminDao;

    @Autowired
    public Admin admin;

    @Autowired
    public ProductCategoryDao productCategoryDao;

    @Autowired
    public SolutionDao solutionDao;

    @Autowired
    public ProductPriceDao productPriceDao;
    
    public ResponseEntity<?> addProductDetail( String modelNumber,String productName, String productHighlights,
            String productPrice, String productImage1, String productImage2, String productImage3,String videoLink,String productCategory,String authorization, String brochureLink) {
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can add product");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }
            

            Product productDetail = new Product();
            productDetail.setModelNumber(modelNumber);
            productDetail.setProductHighlights(productHighlights);
            productDetail.setProductImage1(productImage1);
            productDetail.setProductImage2(productImage2);
            productDetail.setProductImage3(productImage3);
            productDetail.setProductCategory(productCategory);
            productDetail.setProductVideoLink(videoLink);
            productDetail.setProductPrice(productPrice);
            productDetail.setProductName(productName);
            productDetail.setIndex("0");
            productDetail.setBrochureLink(brochureLink);
            
            
            
            // productDao.save(productDetail);

            List<Product> products = productDao.findAll();
            ArrayList<ProductDescription> productDescriptions = new ArrayList<>();
            ArrayList<AdditionalFeatures> additionalFeatures = new ArrayList<>();
            List<ProductSpecifications> productSpecifications = new ArrayList<>();
            boolean flag = false;

            for(int i=0;i<products.size();i++){
                if(products.get(i).getModelNumber().equals(modelNumber)){
                    productDescriptions = products.get(i).getProductDescriptions();
                    additionalFeatures = products.get(i).getAdditionalFeatures();
                    productSpecifications = products.get(i).getSpecifications();
                    flag = true;
                    break;


                }
                else{
                    flag = false;
                }
            }
            if(flag){
                productDetail.setProductDescriptions(productDescriptions);
                productDetail.setAdditionalFeatures(additionalFeatures);
                productDetail.setSpecifications(productSpecifications);
                productDao.save(productDetail);

            }else{
                productDao.save(productDetail);
            }



            // ProductCategory productCategory2 = productCategoryDao.findProductCategoryByProductcategory(productCategory);
            // if(productCategory2!=null){
            //     productCategory2.getModelNum().add(modelNumber);
            //     productCategoryDao.save(productCategory2);
            // }

            ProductCategory productCategory3 = productCategoryDao.findProductCategoryByProductcategory(productCategory);
            boolean flag1 = false;
            int index = 0;
            if(productCategory3!=null){
                
                for(int i=0;i<productCategory3.getModelNum().size();i++){
                    if(productCategory3.getModelNum().get(i).equals(modelNumber)){
                        productCategory3.getModelNum().remove(i);
                        flag1 = true;
                        index = i;
                        break;
                    }else{
                        flag1 = false;
                    }  
                }
                if(flag){
                    productCategory3.getModelNum().add(index,modelNumber);
                    productCategoryDao.save(productCategory3);
                }else{
                    productCategory3.getModelNum().add(modelNumber);
                    productCategoryDao.save(productCategory3);
                }
                
            }

            
            responseMessage.setMessage("Model saved successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);

        }catch(Exception e){
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> predictPrice(String productName, String authorization) {
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can access product price");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }
            
            ProductPrice productPrice = productPriceDao.findProductByProductName(productName);

            if(productPrice == null) {
                responseMessage.setMessage("No such Product Found.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            return ResponseEntity.status(HttpStatus.OK).body(productPrice);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteAllProducts(String authorization){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can delete product");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            List<Product> products = productDao.findAll();
            if(products!=null){
                productDao.deleteAll();
            }

            List<ProductCategory> productCategories = productCategoryDao.findAll();
            if(productCategories!=null){
                productCategoryDao.deleteAll();
            }

            List<Solution> solutions = solutionDao.findAll();
            for(int i=0;i<solutions.size();i++){
                for(int j=0;j<solutions.get(i).getProductusedlist().size();j++){
                    solutions.get(i).getProductusedlist().clear();
                }

                solutionDao.save(solutions.get(i));
            }

            responseMessage.setMessage("all products deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteProductsById(String authorization,String modelNumber){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can delete product");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            Product product = productDao.findProductBymodelNumber(modelNumber);
            if(product!=null){
                productDao.delete(product);
                List<ProductCategory> productCategories = productCategoryDao.findAll();
                for(int i=0;i<productCategories.size();i++){
                    ProductCategory productCategory = productCategories.get(i);
                    System.out.println("inside for");
                    System.out.println(productCategory);
                    List<String> modelnums = productCategory.getModelNum();
                    System.out.println(modelnums);
                    System.out.println(modelnums.size());
                    
                    for(int j=0;j<modelnums.size();j++){
                        System.out.println("inside double for");
                        System.out.println(modelNumber);
                        System.out.println(modelnums.get(j));
                        if(modelNumber.equals(modelnums.get(j))){
                            System.out.println("in if");
                            
                            productCategory.getModelNum().remove(j);
                        }
                    }
                    productCategoryDao.save(productCategory);
                }
                
            }

            List<Solution> solutions = solutionDao.findAll();
            for(int i=0;i<solutions.size();i++){
                for(int j=0;j<solutions.get(i).getProductusedlist().size();j++){
                    if(solutions.get(i).getProductusedlist().get(j).equals(modelNumber)){
                        solutions.get(i).getProductusedlist().remove(j);

                    }

                }
                
                
                solutionDao.save(solutions.get(i));
            }
            


            responseMessage.setMessage("product deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteProductCategories(String authorization){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can delete product");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            List<ProductCategory> productCategories = productCategoryDao.findAll();
            if(productCategories!=null){
                productCategoryDao.deleteAll();
            }

            responseMessage.setMessage("product categories deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteProductCategoryByName(String authorization,String productcategory){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can delete product category");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            ProductCategory productCategory = productCategoryDao.findProductCategoryByProductcategory(productcategory);
            if(productCategory!=null){
                productCategoryDao.delete(productCategory);
            }

            responseMessage.setMessage("product category deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> getProducts(){
        try {
            List<Product> productDetails = productDao.findAll();
            List<ProductsDetailsResponse> productsDetailsResponses = new ArrayList<>();
            for(int i=0;i<productDetails.size();i++){
                ProductsDetailsResponse productsDetailsResponse = new ProductsDetailsResponse();
                productsDetailsResponse.setModelNumber(productDetails.get(i).getModelNumber());
                productsDetailsResponse.setProductName(productDetails.get(i).getProductName());
                
                productsDetailsResponse.setProductPrice(productDetails.get(i).getProductPrice());
                productsDetailsResponse.setProductImage1(productDetails.get(i).getProductImage1());
                productsDetailsResponse.setProductImage2(productDetails.get(i).getProductImage2());
                productsDetailsResponse.setProductImage3(productDetails.get(i).getProductImage3());
                productsDetailsResponse.setVideoLink(productDetails.get(i).getProductVideoLink());
                productsDetailsResponse.setProductHighlights(productDetails.get(i).getProductHighlights());
                productsDetailsResponse.setProductDescriptions(productDetails.get(i).getProductDescriptions());
                productsDetailsResponse.setImgSrc(productDetails.get(i).getImgsrc());
                productsDetailsResponse.setIndex(productDetails.get(i).getIndex());
                productsDetailsResponse.setBrochureLink(productDetails.get(i).getBrochureLink());
                productsDetailsResponse.setProductSpecifications(productDetails.get(i).getProductSpecifications());
                
                productsDetailsResponses.add(productsDetailsResponse);
                
            }
            return ResponseEntity.status(HttpStatus.OK).body(productsDetailsResponses);

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> getProductById(String model){
        try {
            Product product = productDao.findProductBymodelNumber(model);
            return ResponseEntity.status(HttpStatus.OK).body(product);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> addDescription(String authorization,String modelNumber,String title,String description,String image){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admin can add description");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            Product product = productDao.findProductBymodelNumber(modelNumber);
            if(product==null){
                responseMessage.setMessage("Product Not found");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            int index=0;
            boolean flag = false;
            ArrayList<ProductDescription> list = product.getProductDescriptions();
            if(list==null){
                list = new ArrayList<>();
            }else{
                for(int i=0;i<list.size();i++){
                    if(list.get(i).getTitle().equals(title)){
                        flag = true;
                        list.remove(i);
                        index = i;

                    }
                }
            }
            ProductDescription productDescription = new ProductDescription(title,description,image);
            if(flag){
                list.add(index,productDescription);
            }else{
                list.add(productDescription);
            }
            
            product.setProductDescriptions(list);
            productDao.save(product);
            responseMessage.setMessage("Product Details updated Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteDescription(String authorization,String modelNumber,String title){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admin can delete description");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }

            Product product = productDao.findProductBymodelNumber(modelNumber);
            for(int i=0;i<product.getProductDescriptions().size();i++){
                if(product.getProductDescriptions().get(i).getTitle().equals(title)){
                    product.getProductDescriptions().remove(i);
                }
            }
            productDao.save(product);

            responseMessage.setMessage("product description deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> addAditionalFeatures(String authorization,String title,String description,String modelNumber){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admin can add additional features");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            Product product = productDao.findProductBymodelNumber(modelNumber);
            if(product==null){
                responseMessage.setMessage("Product Not found");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            int index = 0;
            boolean flag = false;
            ArrayList<AdditionalFeatures> list = product.getAdditionalFeatures();
            if(list==null){
                list = new ArrayList<>();
            }else{
                for(int i=0;i<list.size();i++){
                    if(list.get(i).getTitle().equals(title)){
                        list.remove(i);
                        flag = true;
                        index = i;
                    }
                }
            }
            AdditionalFeatures additionalFeatures = new AdditionalFeatures(title,description);
            if(flag){
                list.add(index,additionalFeatures);
            }else{
                list.add(additionalFeatures);
            }
            
            product.setAdditionalFeatures(list);
            productDao.save(product);
            responseMessage.setMessage("Product Details updated Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);

            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteAdditionalFeatures(String authorization,String modelNumber,String title){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admin can delete features");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }

            Product product = productDao.findProductBymodelNumber(modelNumber);
            for(int i=0;i<product.getAdditionalFeatures().size();i++){
                if(product.getAdditionalFeatures().get(i).getTitle().equals(title)){
                    product.getAdditionalFeatures().remove(i);
                }
            }
            productDao.save(product);

            responseMessage.setMessage("product additional features deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> addProductSpecs(String authorization, String modelNumber, String headTitle,String key, String value){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if (admin == null) {
                responseMessage.setMessage("Only admin can add product specifications");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            Product existingProduct = productDao.findProductBymodelNumber(modelNumber);

            if (existingProduct == null) {
                responseMessage.setMessage("Product Not Found!!");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }


            String[] keyarr = key.split(";");
            String[] valuearr = value.split(";");
            List<SpecificationDetails> specificationDetailspre = new ArrayList<>();
            for(int i=0;i<keyarr.length;i++){
                SpecificationDetails specificationDetailpre = new SpecificationDetails();
                specificationDetailpre.setKey(keyarr[i]);
                specificationDetailpre.setValue(valuearr[i]);
                specificationDetailspre.add(specificationDetailpre);

            }
            
            Product product = productDao.findProductBymodelNumber(modelNumber);
            // if(product.getSpecifications()==null){
            //     List<ProductSpecifications> productSpecificationsList = new ArrayList<>();
            // }else{
                
            // }
            boolean flag = false;
            int index = 0;
            List<ProductSpecifications> productSpecificationList = product.getSpecifications();
            if(productSpecificationList==null){
                productSpecificationList = new ArrayList<>();
            }else{
                for(int i=0;i<productSpecificationList.size();i++){
                    if(productSpecificationList.get(i).getHead().equals(headTitle)){
                        productSpecificationList.remove(i);
                        flag = true;
                        index = i;
                    }
                }
            }
            ProductSpecifications productSpecifications = new ProductSpecifications();
            productSpecifications.setHead(headTitle);
            productSpecifications.setSpecs(specificationDetailspre);
            
            
            

            
            if(flag){
                productSpecificationList.add(index,productSpecifications);
            }else{
                productSpecificationList.add(productSpecifications);
            }
            

            product.setSpecifications(productSpecificationList);

            productDao.save(product);



            responseMessage.setMessage("Product Specifications Saved Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }

    }

    public ResponseEntity<?> deleteProductSpecs(String authorization, String modelNumber, String head){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if (admin == null) {
                responseMessage.setMessage("Only admin can delete product specifications");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }

            Product product = productDao.findProductBymodelNumber(modelNumber);
            for(int i=0;i<product.getSpecifications().size();i++){
                if(product.getSpecifications().get(i).getHead().equals(head)){
                    product.getSpecifications().remove(i);
                }

            }
            productDao.save(product);

            responseMessage.setMessage("product specs deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> addProductSpecifications(String authorization,String modelNumber,HashMap<String,HashMap<String,String>> productSpecs){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if (admin == null) {
                responseMessage.setMessage("Only admin can add product specifications");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            Product existingProduct = productDao.findProductBymodelNumber(modelNumber);
            if (productSpecs == null) {
                responseMessage.setMessage("Product Specs is Empty");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            
            if (existingProduct == null) {
                responseMessage.setMessage("Product Not Found!!");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            // existingProductDetail.setProductInformation(productDetail);
            try {
                existingProduct.setProductSpecifications(productSpecs);
                
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            productDao.save(existingProduct);
            responseMessage.setMessage("Product Specifications Saved Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> addProductCategory(String authorization,String productcategory,String modelNum){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admin can add product category");
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseMessage);
            }
            String[] modelNumFinal = modelNum.split(";");
            HashSet<String> models = new HashSet<>();
            for(int i=0;i<modelNumFinal.length;i++){
                try {
                    Product product = productDao.findProductBymodelNumber(modelNumFinal[i]);
                    if(product!=null){
                        models.add(modelNumFinal[i]);
                    }
                } catch (Exception e) {
                    // TODO: handle exception
                    e.printStackTrace();
                }
                
            }
            ProductCategory productCategory = new ProductCategory();
            productCategory.setProductcategory(productcategory);
            productCategory.setModelNum(new ArrayList<>(models));
            productCategoryDao.save(productCategory);

            responseMessage.setMessage("product category added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
            
            

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> getProductCategory(){
        try {
            List<ProductCategory> productCategory = productCategoryDao.findAll();
            // List<Product> product = productDao.findAll();
            List<ProductCategoryResponse> productCategoryResponses = new ArrayList<>();
            for(int i=0;i<productCategory.size();i++){
                ProductCategoryResponse productCategoryResponse = new ProductCategoryResponse();
                productCategoryResponse.setTitle(productCategory.get(i).getProductcategory());
                List<ProductCategoryModelsResponse> models = new ArrayList<>();
                for(int j=0;j<productCategory.get(i).getModelNum().size();j++){
                    Product product = productDao.findProductBymodelNumber(productCategory.get(i).getModelNum().get(j));
                    
                    ProductCategoryModelsResponse model = new ProductCategoryModelsResponse();
                    model.setModelNum(product.getModelNumber());
                    model.setProductname(product.getProductName());
                    model.setProductimg(product.getProductImage1());
                    models.add(model);
                    
                }
                productCategoryResponse.setProducts(models);

                productCategoryResponses.add(productCategoryResponse);
                    
            }

            return ResponseEntity.status(HttpStatus.OK).body(productCategoryResponses);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }
}
