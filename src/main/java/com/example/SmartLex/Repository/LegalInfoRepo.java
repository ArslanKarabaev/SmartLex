package com.example.SmartLex.Repository;

import com.example.SmartLex.Entity.Experience;
import com.example.SmartLex.Entity.LegalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LegalInfoRepo extends JpaRepository<LegalInfo, Long> {
    @Query("SELECT l FROM LegalInfo l WHERE l.legalInfoId = ?1")
    Optional<LegalInfo> findLegalInfoById(Long id);
}
