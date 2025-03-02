package com.example.SmartLex.Repository;

import com.example.SmartLex.Entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServicesRepo extends JpaRepository<Services, Long> {
    @Query("SELECT s FROM Services s WHERE s.serviceId = ?1")
    Optional<Services> findServicesById(Long id);


}
