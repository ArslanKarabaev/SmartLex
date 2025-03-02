package com.example.SmartLex.Controller;

import com.example.SmartLex.Entity.*;
import com.example.SmartLex.Services.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/SmartLex/AdMiNbAkYt1")
public class AdminController {
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping(path = "/getContacts")
    public ResponseEntity<List<Contact>> getContacts() {
        return ResponseEntity.ok(adminService.getContacts());
    }

    @PostMapping(path = "/addNewExperience")
    public void addNewExperience(@Valid @RequestBody Experience experience){
        adminService.addNewExperience(experience);
    }

    @PostMapping(path = "/deleteExperience/{expId}")
    public void deleteExperience(@PathVariable("expId") Long expId){
        adminService.deleteExperience(expId);
    }

    @PostMapping(path = "/addNewLegalInfo")
    public void addNewLegalInfo(@Valid @RequestBody LegalInfo legalInfo){
        adminService.addNewLegalInfo(legalInfo);
    }

    @PostMapping(path = "/deleteLegalInfo/{legalInfoId}")
    public void deletelegalInfo(@PathVariable("legalInfoId") Long legalInfoId){
        adminService.deleteLegalInfo(legalInfoId);
    }

    @PostMapping(path = "/addNewService")
    public void addNewService(@Valid @RequestBody Services service){
        adminService.addNewService(service);
    }

    @PostMapping(path = "/deleteService/{serviceId}")
    public void deleteService(@PathVariable("serviceId") Long serviceId){
        adminService.deleteService(serviceId);
    }

    @PostMapping(path = "/addNewTeamMember")
    public void addNewTeamMember(@Valid @RequestBody Team team){
        adminService.addNewTeamMember(team);
    }

    @PostMapping(path = "/deleteTeamMember/{teamId}")
    public void deleteTeamMember(@PathVariable("teamId") Long teamId){
        adminService.deleteTeamMember(teamId);
    }


}
