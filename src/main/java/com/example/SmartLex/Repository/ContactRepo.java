package com.example.SmartLex.Repository;

import com.example.SmartLex.Entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long> {
    @Query("SELECT c FROM Contact c WHERE c.contactId = ?1")
    Optional<Contact> findContactById(Long id);

}
