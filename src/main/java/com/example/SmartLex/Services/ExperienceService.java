package com.example.SmartLex.Services;

import com.example.SmartLex.Entity.Experience;
import com.example.SmartLex.Repository.ExperienceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {
    private final ExperienceRepo experienceRepo;

    @Autowired
    public ExperienceService(ExperienceRepo experienceRepo) {
        this.experienceRepo = experienceRepo;
    }

    public List<Experience> getAllExperience() {
        return experienceRepo.findAll();
    }

    public Optional<Experience> getExperienceById(Long expId) {
        boolean exists = experienceRepo.existsById(expId);
        if (!exists) {
            throw new IllegalStateException("There is no Experience with id " + expId);
        }
        return experienceRepo.findExperienceById(expId);
    }

}
