package com.gitlab.andrepenteado.apclinic.controllers;

import com.gitlab.andrepenteado.apclinic.entities.Cliente;
import com.gitlab.andrepenteado.apclinic.repositories.ClienteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/cliente")
@Slf4j
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> pesquisar() {
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cliente buscar(@PathVariable Long id) {
        /*return repository.findById(id)
                        .map(record -> ResponseEntity.ok().body(record))
                        .orElse(ResponseEntity.notFound().build());*/
        return clienteRepository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado. ID: " + id));
    }

    @PostMapping
    public Cliente incluir(@Valid @RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> editar(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteRepository.findById(id)
            .map(clienteEntity -> {
                BeanUtils.copyProperties(clienteEntity, cliente);
                Cliente clienteAtualizado = clienteRepository.save(clienteEntity);
                return ResponseEntity.ok().body(clienteAtualizado);
            }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        return clienteRepository.findById(id)
            .map(clienteEntity -> {
                clienteRepository.deleteById(id);
                return ResponseEntity.ok().build();
            }).orElse(ResponseEntity.notFound().build());
    }
}
