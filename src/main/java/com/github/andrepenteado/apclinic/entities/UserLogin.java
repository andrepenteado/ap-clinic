package com.github.andrepenteado.apclinic.entities;

import lombok.Data;

@Data
public class UserLogin {

    private String username;

    private String role;

    private String ip;

}
