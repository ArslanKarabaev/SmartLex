package com.example.SmartLex.Services;

import com.example.SmartLex.Controller.UpdateContactedStatusReq;
import com.example.SmartLex.Entity.*;
import com.example.SmartLex.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final ContactRepo contactRepo;
    private final ExperienceRepo experienceRepo;
    private final LegalInfoRepo legalInfoRepo;
    private final ServicesRepo servicesRepo;
    private final TeamRepo teamRepo;

    @Autowired
    public AdminService(ContactRepo contactRepo, ExperienceRepo experienceRepo, LegalInfoRepo legalInfoRepo, ServicesRepo servicesRepo, TeamRepo teamRepo) {
        this.contactRepo = contactRepo;
        this.experienceRepo = experienceRepo;
        this.legalInfoRepo = legalInfoRepo;
        this.servicesRepo = servicesRepo;
        this.teamRepo = teamRepo;
    }

    public List<Contact> getContacts() {
        return contactRepo.findAll();
    }

    @Transactional
    public void addNewExperience(Experience experience) {
        experienceRepo.save(experience);
    }

    public void deleteExperience(Long expId) {
        boolean exists = experienceRepo.existsById(expId);
        if (!exists) {
            throw new IllegalStateException("Product with id " + expId + " doesn`t exists");
        }
        experienceRepo.deleteById(expId);
    }

    @Transactional
    public void addNewLegalInfo(LegalInfo legalInfo) {
        legalInfoRepo.save(legalInfo);
    }

    public void deleteLegalInfo(Long legalInfoId) {
        boolean exists = legalInfoRepo.existsById(legalInfoId);
        if (!exists) {
            throw new IllegalStateException("Product with id " + legalInfoId + " doesn`t exists");
        }
        legalInfoRepo.deleteById(legalInfoId);
    }

    @Transactional
    public void addNewService(Services service) {
        servicesRepo.save(service);
    }

    public void deleteService(Long serviceId) {
        boolean exists = servicesRepo.existsById(serviceId);
        if (!exists) {
            throw new IllegalStateException("Product with id " + serviceId + " doesn`t exists");
        }
        servicesRepo.deleteById(serviceId);
    }

    @Transactional
    public void addNewTeamMember(Team team) {
        teamRepo.save(team);
    }

    public void deleteTeamMember(Long teamId) {
        boolean exists = teamRepo.existsById(teamId);
        if (!exists) {
            throw new IllegalStateException("Product with id " + teamId + " doesn`t exists");
        }
        teamRepo.deleteById(teamId);
    }

    public void updateContactedStatus(UpdateContactedStatusReq req) {
        Optional<Contact> contact = contactRepo.findContactById(req.getId());
        if (contact.isPresent()) {
            contact.get().setContacted(req.getContacted());
            contactRepo.save(contact.get());
        } else {
            throw new IllegalStateException("Contact not found");
}
    }
}
