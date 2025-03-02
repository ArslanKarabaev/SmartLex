package com.example.SmartLex.Services;

import com.example.SmartLex.Entity.Contact;
import com.example.SmartLex.Repository.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ContactService {
    private final ContactRepo contactRepo;

    @Autowired
    public ContactService(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }

    public void submitContact(Contact contact) {
        contactRepo.save(contact);
    }

}
