package com.gitlab.andrepenteado.apclinic.controllers;

import com.gitlab.andrepenteado.apclinic.entities.Cliente;
import com.gitlab.andrepenteado.apclinic.repositories.ClienteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/api/clientes")
    public List<Cliente> pesquisar() {
        return clienteRepository.findAll();
    }
}
