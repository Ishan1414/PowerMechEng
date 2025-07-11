package com.mavs.backend.controllers.solution;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mavs.backend.helper.ExcelHelper;
import com.mavs.backend.helper.ResponseMessage;
import com.mavs.backend.services.solution.SolutionService;

@RestController
@CrossOrigin(origins = "*")
public class SolutionController {

    @Autowired
    public ResponseMessage responseMessage;

    @Autowired
    public SolutionService solutionService;

    @Autowired
    public ExcelHelper excelHelper;

    
    @PostMapping("/add-solution")
    public ResponseEntity<?> addSolution(@RequestHeader("Authorization") String authorization,@RequestParam("title") String title,@RequestParam("description") String description,@RequestParam("coverimg") String coverimg,@RequestParam("solcategory") String solcategory,@RequestParam("solimg1") String solimg1,@RequestParam("solimg2") String solimg2,@RequestParam("solimg3") String solimg3,@RequestParam("productsused") String productsused){
        try {
            return solutionService.addSolution(title, description, coverimg,solcategory, solimg1, solimg2, solimg3, productsused, authorization);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);

        }
    }

    // @PostMapping("/add-solution")
    // public ResponseEntity<?> addSolution(@RequestHeader("Authorization") String authorization,@RequestParam("title") String title,@RequestParam("description") String description,@RequestParam("coverimg") String coverimg,@RequestParam("solcategory") String solcategory,@RequestParam("solimg1") String solimg1,@RequestParam("solimg2") String solimg2,@RequestParam("solimg3") String solimg3,@RequestParam("productsused") List<String> productsused){
    //     try {
    //         return solutionService.addSolution(title, description, coverimg,solcategory, solimg1, solimg2, solimg3, productsused, authorization);
    //     } catch (Exception e) {
    //         // TODO: handle exception
    //         e.printStackTrace();
    //         responseMessage.setMessage(e.getMessage());
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);

    //     }
    // }

    @PostMapping("/solutionfeatures/{title}")
    public ResponseEntity<?> addSolutionFeatures(@RequestHeader("Authorization") String authorization,@PathVariable("title") String title,@RequestParam("name") String name,@RequestParam("description") String description,@RequestParam("icon") String icon){
        try {
            return solutionService.addSolutionFeatures(name,description,icon,title,authorization);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/deletesolutionfeatures/{solutiontitle}/{featurename}")
    public ResponseEntity<?> deleteSolutionFeatures(@RequestHeader("Authorization") String authorization,@PathVariable("solutiontitle") String solutiontitle,@PathVariable("featurename") String featurename){
        try {
            return solutionService.deleteSolutionFeatures(authorization,solutiontitle,featurename);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/deletesolutionbenefit/{solutiontitle}/{benefitname}")
    public ResponseEntity<?> deleteSolutionBenefits(@RequestHeader("Authorization") String authorization,@PathVariable("solutiontitle") String solutiontitle,@PathVariable("benefitname") String benefitname){
        try {
            return solutionService.deleteSolutionBenefit(authorization, solutiontitle, benefitname);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/solutionbenefits/{title}")
    public ResponseEntity<?> addSolutionBenefits(@RequestHeader("Authorization") String authorization,@PathVariable("title") String title,@RequestParam("name") String name,@RequestParam("description") String description,@RequestParam("icon") String icon){
        try {
            return solutionService.addSolutionBenefits(name, description, icon, title, authorization);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @GetMapping("/solutions")
    public ResponseEntity<?> getAllSolutions(){
        try {
            return solutionService.getAllSolutions();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @GetMapping("/getSolutions/{title}")
    public ResponseEntity<?> getSolutionById(@PathVariable("title") String title){
        try {
            return solutionService.getSolutionById(title);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/solcategory")
    public ResponseEntity<?> addSolutionCategory(@RequestHeader("Authorization") String authorization,@RequestParam("category") String category,@RequestParam("catimg") String catimg,@RequestParam("catdescription") String catdescription){
        try {
            return solutionService.addSolutionCategory(category, catimg, catdescription, authorization);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @GetMapping("/getsolcategory")
    public ResponseEntity<?> getSolutionCategories(){
        try {
            return solutionService.getSolutionCategories();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @GetMapping("/getsolcategorydetail")
    public ResponseEntity<?> getSolutionCategoriesDetail(){
        try {
            return solutionService.getSolutionCategoryDetails();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/excel/solutions")
    public ResponseEntity<?> addExcelSolutions(@RequestParam("file") MultipartFile file){
        try {
            return excelHelper.addExcelSolutions(file.getInputStream());
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }

    }

    @DeleteMapping("/delete-solutions")
    public ResponseEntity<?> deleteAllSolutions(@RequestHeader("Authorization") String authorization){
        try {
            return solutionService.deleteAllSolutions(authorization);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/deleteSolutionsById/{title}")
    public ResponseEntity<?> deleteSolutionsById(@RequestHeader("Authorization") String authorization,@PathVariable("title") String title){
        try {
            return solutionService.deleteSolutionsById(authorization, title);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/delete-solutioncategory")
    public ResponseEntity<?> deleteSolutionCategories(@RequestHeader("Authorization") String authorization){
        try {
            return solutionService.deleteSolutionCategories(authorization);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @DeleteMapping("/deleteSolutionById/{category}")
    public ResponseEntity<?> deleteSolutionCategoryById(@RequestHeader("Authorization") String authorization,@PathVariable("category") String category){
        try {
            return solutionService.deleteSolutionCategoryById(authorization, category);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    @PostMapping("/excel/solcategory")
    public ResponseEntity<?> addExcelSolCategory(@RequestParam("file") MultipartFile file){
        try {
            return excelHelper.addExcelSolCategory(file.getInputStream());
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }
}
