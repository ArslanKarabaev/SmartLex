package com.example.SmartLex.Controller;

import com.example.SmartLex.Entity.Team;
import com.example.SmartLex.Services.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/SmartLex/Team")
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping(path = "/getAllTeam")
    public ResponseEntity<List<Team>> getAllTeam(){
        return ResponseEntity.ok(teamService.getAllTeam());
    }

    @GetMapping(path = "/getTeamMemberById/{teamMemberId}")
    public ResponseEntity<Optional<Team>> getTeamMemberById(@PathVariable("teamMemberId") Long teamMemberId){
        return ResponseEntity.ok(teamService.getTeamMemberById(teamMemberId));
    }
}
