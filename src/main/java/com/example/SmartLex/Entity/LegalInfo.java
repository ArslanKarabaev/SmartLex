package com.example.SmartLex.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LegalInfo {
    @Id
    @GeneratedValue
    private Long legalInfoId;
    @Column(length = 1000)
    private String name;
    @Column(length = 1000)
    private String legalInfoDesc;


    public Long getLegalInfoId() {
        return legalInfoId;
    }

    public void setLegalInfoId(Long legalInfoId) {
        this.legalInfoId = legalInfoId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLegalInfoDesc() {
        return legalInfoDesc;
    }

    public void setLegalInfoDesc(String legalInfoDesc) {
        this.legalInfoDesc = legalInfoDesc;
    }
}
