package com.example.SmartLex.Repository;

import com.example.SmartLex.Entity.Services;
import com.example.SmartLex.Entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepo extends JpaRepository<Team, Long> {
    @Query("SELECT t FROM Team t WHERE t.teamId = ?1")
    Optional<Team> findTeamById(Long id);
}
