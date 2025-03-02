package com.example.SmartLex.Services;

import com.example.SmartLex.Entity.Services;
import com.example.SmartLex.Repository.ServicesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicesService {
    private final ServicesRepo servicesRepo;

    @Autowired
    public ServicesService(ServicesRepo servicesRepo) {
        this.servicesRepo = servicesRepo;
    }

    public List<Services> getAllServices(){
        return servicesRepo.findAll();
    }
}
