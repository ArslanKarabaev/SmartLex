package com.example.SmartLex.Controller;

import com.example.SmartLex.Entity.Services;
import com.example.SmartLex.Services.ServicesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/SmartLex/Services")
public class ServicesController {

    private final ServicesService servicesService;

    @Autowired
    public ServicesController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }

    @GetMapping()
    public ResponseEntity<List<Services>> getAllServices(){
       return ResponseEntity.ok(servicesService.getAllServices());
    }


}
