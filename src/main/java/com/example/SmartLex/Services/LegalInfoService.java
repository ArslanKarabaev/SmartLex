package com.example.SmartLex.Services;

import com.example.SmartLex.Entity.LegalInfo;
import com.example.SmartLex.Repository.LegalInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LegalInfoService {
    private final LegalInfoRepo legalInfoRepo;

    @Autowired
    public LegalInfoService(LegalInfoRepo legalInfoRepo) {
        this.legalInfoRepo = legalInfoRepo;
    }

    public List<LegalInfo> getAllLegalInfo(){
        return legalInfoRepo.findAll();
    }
}
