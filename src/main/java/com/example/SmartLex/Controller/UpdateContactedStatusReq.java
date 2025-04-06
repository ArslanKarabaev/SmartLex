package com.example.SmartLex.Controller;

public class UpdateContactedStatusReq {
    private Long id;
    private Boolean contacted = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getContacted() {
        return contacted;
    }

    public void setContacted(Boolean contacted) {
        this.contacted = contacted;
    }
}
