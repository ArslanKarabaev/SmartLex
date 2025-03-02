package com.example.SmartLex.Repository;

import com.example.SmartLex.Entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExperienceRepo extends JpaRepository<Experience, Long> {
    @Query("SELECT e FROM Experience e WHERE e.expId = ?1")
    Optional<Experience> findExperienceById(Long id);
}
