package com.example.SmartLex.Controller;

import com.example.SmartLex.Entity.*;
import com.example.SmartLex.Services.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

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

    @PutMapping(path = "/updateContactedStatus")
    public void updateContactedStatus(@Valid @RequestBody UpdateContactedStatusReq req){
        adminService.updateContactedStatus(req);
    }

    @PostMapping(path = "/addNewExperience")
    public void addNewExperience(@Valid @RequestBody Experience experience){
        adminService.addNewExperience(experience);
    }

    @DeleteMapping(path = "/deleteExperience/{expId}")
    public void deleteExperience(@PathVariable("expId") Long expId){
        adminService.deleteExperience(expId);
    }

    @PostMapping(path = "/addNewLegalInfo")
    public void addNewLegalInfo(@Valid @RequestBody LegalInfo legalInfo){
        adminService.addNewLegalInfo(legalInfo);
    }

    @DeleteMapping(path = "/deleteLegalInfo/{legalInfoId}")
    public void deletelegalInfo(@PathVariable("legalInfoId") Long legalInfoId){
        adminService.deleteLegalInfo(legalInfoId);
    }

    @PostMapping(path = "/addNewService")
    public void addNewService(@Valid @RequestBody Services service){
        adminService.addNewService(service);
    }

    @DeleteMapping(path = "/deleteService/{serviceId}")
    public void deleteService(@PathVariable("serviceId") Long serviceId){
        adminService.deleteService(serviceId);
    }

    @PostMapping(path = "/addNewTeamMember", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addNewTeamMember(
            @RequestParam("teamFio") String fio,
            @RequestParam("teamDesc") String description,
            @RequestParam("photo") MultipartFile photo) {

        try {
            // Проверяем, не пустой ли файл
            if (photo.isEmpty()) {
                return ResponseEntity.badRequest().body("Файл не загружен!");
            }

            // Генерируем уникальное имя для файла
            String fileName = UUID.randomUUID() + "_" + photo.getOriginalFilename();
            Path filePath = Paths.get("uploads/team/", fileName);

            // Создаем директорию (если нет) и сохраняем файл
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, photo.getBytes());

            // Сохраняем данные в БД
            Team teamMember = new Team();
            teamMember.setTeamFio(fio);
            teamMember.setTeamDesc(description);
            teamMember.setPhoto("/uploads/team/" + fileName); // Храним путь, а не Base64

            adminService.addNewTeamMember(teamMember);

            return ResponseEntity.ok("Командный участник успешно добавлен!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ошибка загрузки файла: " + e.getMessage());
        }
    }

    @DeleteMapping(path = "/deleteTeamMember/{teamId}")
    public void deleteTeamMember(@PathVariable("teamId") Long teamId){
        adminService.deleteTeamMember(teamId);
    }


}
