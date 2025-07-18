package com.mavs.backend.services.home;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.mavs.backend.daos.admin.AdminDao;
import com.mavs.backend.daos.home.AchievementsDao;
import com.mavs.backend.daos.home.CompanyDescriptionDao;
import com.mavs.backend.daos.home.CounterDao;
import com.mavs.backend.daos.home.HomeCoverDao;
import com.mavs.backend.daos.home.HomeDao;
import com.mavs.backend.daos.solution.SolutionCategoryDao;
import com.mavs.backend.entities.admin.Admin;
import com.mavs.backend.entities.home.Achievements;
import com.mavs.backend.entities.home.CompanyDescription;
import com.mavs.backend.entities.home.Counter;
import com.mavs.backend.entities.home.Home;
import com.mavs.backend.entities.home.HomeCover;
import com.mavs.backend.entities.home.SubLink;
import com.mavs.backend.entities.solution.SolutionCategory;
import com.mavs.backend.helper.JwtUtil;
import com.mavs.backend.helper.ResponseMessage;

@Repository
@Component
public class HomeService {
    
    @Autowired
    public ResponseMessage responseMessage;

    @Autowired
    public JwtUtil jwtUtil;

    @Autowired
    public Admin admin;

    @Autowired
    public AdminDao adminDao;

    @Autowired SolutionCategoryDao solutionCategoryDao;

    @Autowired
    public HomeDao homedao;

    @Autowired
    public HomeCoverDao homeCoverDao;

    @Autowired
    public AchievementsDao achievementsDao;

    @Autowired
    public CompanyDescriptionDao companyDescriptionDao;

    @Autowired
    public CounterDao counterDao;

    public ResponseEntity<?> addNavbarDetails(String authorization, String name, String mainlink, String submenu){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can add details");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            Home home = new Home();
            home.setName(name);
            home.setMainlink(mainlink);
            home.setSubmenu(submenu);
            // if(submenu == "true"){
                if(submenu.equals("true")){
                System.out.println("Inside sublink");
                List<SubLink> sublinks = new ArrayList<>();
            List<SolutionCategory> solutionCategory = solutionCategoryDao.findAll();
            for(int i=0;i<solutionCategory.size();i++)
            {
                SubLink subLink = new SubLink();
                subLink.setHead(solutionCategory.get(i).getCategory());
                List<String> titles = new ArrayList<>();
                for(int j=0;j<solutionCategory.get(i).getSolutions().size();j++){
                titles.add(solutionCategory.get(i).getSolutions().get(j).getTitle());
                }
                subLink.setSublink(titles);

                sublinks.add(subLink);

            }
            
            home.setSublinks(sublinks);
            // }
        }
            
            homedao.save(home);
            responseMessage.setMessage("Saved successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);


        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteNavbar(){
        try {
            List<Home> homes = homedao.findAll();
            if(homes!=null){
                homedao.deleteAll();
            }
            responseMessage.setMessage("Navbar Deleted Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> getNavbarDetails(){
        try {
            List<Home> home  = homedao.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(home);

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> addCounter(String authorization,String parameter,String count){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can add details");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            Counter counter = new Counter();
            counter.setParameter(parameter);
            counter.setCount(count);

            counterDao.save(counter);

            responseMessage.setMessage("count saved successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);


        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> getCount(){
        try {
            List<Counter> counters = counterDao.findAll();

            return ResponseEntity.status(HttpStatus.OK).body(counters);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> getCountById(String parameter){
        try {
            Counter counter = counterDao.findCounterByParameter(parameter);

            return ResponseEntity.status(HttpStatus.OK).body(counter);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteAllCounters(String authorization){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can delete details");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            List<Counter> counters = counterDao.findAll();
            if(counters!=null){
                counterDao.deleteAll();
            }

            responseMessage.setMessage("counters deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteCounter(String authorization, String parameter){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can delete details");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            Counter counter = counterDao.findCounterByParameter(parameter);
            if(counter!=null){
                counterDao.delete(counter);
            }

            responseMessage.setMessage("counter deleted");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> addHomeCovers(String authorization,String video,String coverdescription){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can add details");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            HomeCover homecover = new HomeCover();
            homecover.setVideo(video);
            homecover.setDescription(coverdescription);
            homeCoverDao.save(homecover);
            responseMessage.setMessage("home cover details saved successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> deleteHomeCover(String authorization, String description){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can delete details");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            HomeCover homeCover = homeCoverDao.findHomeCoverByDescription(description);
            if(homeCover!=null){
                homeCoverDao.delete(homeCover);
            }

            responseMessage.setMessage("Details Deleted Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    public ResponseEntity<?> getHomeCovers(){
        try {
            List<HomeCover> homeCovers = homeCoverDao.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(homeCovers);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((responseMessage));
        }
    }

    public ResponseEntity<?> addAchievements(String authorization, String img){
        try {
                String token = authorization.substring(7);
                String email = jwtUtil.extractUsername(token);
                admin = adminDao.findAdminByEmail(email);
                if(admin==null){
                    responseMessage.setMessage("Only admins can add details");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
                }
                
            Achievements achievements = new Achievements();
            achievements.setAchievementImg(img);
            achievementsDao.save(achievements);

            responseMessage.setMessage("achievements uploaded successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((responseMessage));
        }
    }

    public ResponseEntity<?> deleteAchievements(String authorization, String img){
        try {
            String token = authorization.substring(7);
            String email = jwtUtil.extractUsername(token);
            admin = adminDao.findAdminByEmail(email);
            if(admin==null){
                responseMessage.setMessage("Only admins can delete details");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
            }

            Achievements achievements = achievementsDao.findAchievementsByAchievementImg(img);
            if(achievements!=null){
                achievementsDao.delete(achievements);
            }

            responseMessage.setMessage("achievements deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);

            
            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((responseMessage));
        }
    }

    public ResponseEntity<?> getAchievements(){
        try {
            List<Achievements> achievements = achievementsDao.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(achievements);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((responseMessage));
        }
    }

    public ResponseEntity<?> addCompanyDescription(String authorization,String title,String description){
        try {
            String token = authorization.substring(7);
                String email = jwtUtil.extractUsername(token);
                admin = adminDao.findAdminByEmail(email);
                if(admin==null){
                    responseMessage.setMessage("Only admins can add details");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
                }

            CompanyDescription companyDescription = new CompanyDescription();
            companyDescription.setTitle(title);
            companyDescription.setDescription(description);
            companyDescriptionDao.save(companyDescription);

            responseMessage.setMessage("description saved successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((responseMessage));
        }
    }

    public ResponseEntity<?> deleteCompanyDescription(String authorization, String title){
        try {
            String token = authorization.substring(7);
                String email = jwtUtil.extractUsername(token);
                admin = adminDao.findAdminByEmail(email);
                if(admin==null){
                    responseMessage.setMessage("Only admins can delete details");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
                }
            
            CompanyDescription companyDescription = companyDescriptionDao.findCompanyDescriptionByTitle(title);
            if(companyDescription!=null){
                companyDescriptionDao.delete(companyDescription);
            }

            responseMessage.setMessage("description deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(responseMessage);
            
            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((responseMessage));
        }
    }

    public ResponseEntity<?> getCompanyDescription(){
        try {
            List<CompanyDescription> companyDescriptions = companyDescriptionDao.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(companyDescriptions);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            responseMessage.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body((responseMessage));
            
        }
    }
}
