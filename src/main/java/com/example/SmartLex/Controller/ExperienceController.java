package com.example.SmartLex.Controller;

import com.example.SmartLex.Entity.Experience;
import com.example.SmartLex.Services.ExperienceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/SmartLex/Experience")
public class ExperienceController {
    private final ExperienceService experienceService;

    @Autowired
    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }



    @GetMapping(path = "/getAllExperience")
    public ResponseEntity<List<Experience>> getAllExp(){
        return ResponseEntity.ok(experienceService.getAllExperience());
    }

//    @GetMapping(path = "/getExperienceById/{expId}")
//    public ResponseEntity<Experience> getExpById(@PathVariable("expId") Long expId){
//        return ResponseEntity.ok(experienceService.getExperienceById(expId));
//    }
}
