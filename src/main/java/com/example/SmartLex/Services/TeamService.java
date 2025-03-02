package com.example.SmartLex.Services;

import com.example.SmartLex.Entity.Team;
import com.example.SmartLex.Repository.TeamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {
    private final TeamRepo teamRepo;

    @Autowired
    public TeamService(TeamRepo teamRepo) {
        this.teamRepo = teamRepo;
    }

    public List<Team> getAllTeam() {
        return teamRepo.findAll();
    }

    public Optional<Team> getTeamMemberById(Long teamMemberId) {
        boolean exists = teamRepo.existsById(teamMemberId);
        if (!exists) {
            throw new IllegalStateException("There is no Team Member with id " + teamMemberId);
        }
        return teamRepo.findTeamById(teamMemberId);
    }
}
