package com.example.SmartLex.Controller;

import com.example.SmartLex.Entity.LegalInfo;
import com.example.SmartLex.Services.LegalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/SmartLex/LegalInfo")
public class LegalInfoController {

    private final LegalInfoService legalInfoService;

    @Autowired
    public LegalInfoController(LegalInfoService legalInfoService) {
        this.legalInfoService = legalInfoService;
    }

    @GetMapping
    public List<LegalInfo> getAllLegalInfo() {
        return legalInfoService.getAllLegalInfo();
    }
}
