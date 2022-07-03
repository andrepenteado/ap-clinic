package com.github.andrepenteado.apclinic.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.github.andrepenteado.apclinic.entities.Cliente;
import com.github.andrepenteado.apclinic.repositories.ClienteRepository;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clientes")
@Slf4j
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> pesquisar() {
        log.info("Pesquisar clientes");
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cliente buscar(@PathVariable Long id) {
        log.info("Buscar cliente #" + id);
        return clienteRepository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente de ID " + id + " não encontrado"));
    }

    @PostMapping
    public Cliente incluir(@Valid @RequestBody Cliente cliente, BindingResult result) {
        log.info("Incluir cliente " + cliente.getNome());
        cliente.setDataCadastro(LocalDateTime.now());
        // Checar validações
        if (result.hasErrors())
            throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    result.getFieldErrors().stream().map(error ->
                            StringUtils.capitalize(error.getField()).concat(" ").concat(error.getDefaultMessage()))
                    .collect(Collectors.joining(". "))
            );
        // Checar CPF
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente com CPF " + cliente.getCpf() + " existente.");
        return clienteRepository.save(cliente);
    }

    @PutMapping
    public Cliente editar(@Valid @RequestBody Cliente cliente, BindingResult result) {
        log.info("Editar cliente " + cliente.getNome());
        cliente.setDataAtualizacao(LocalDateTime.now());
        // Checar se existe
        Cliente clienteManaged = clienteRepository.findById(cliente.getId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente de ID " + cliente.getId() + " não encontrado"));
        // Checar validações
        if (result.hasErrors())
            throw new ResponseStatusException(
                    HttpStatus.UNPROCESSABLE_ENTITY,
                    result.getFieldErrors().stream().map(error ->
                            StringUtils.capitalize(error.getField()).concat(" ").concat(error.getDefaultMessage()))
                    .collect(Collectors.joining(". "))
            );
        // Checar CPF
        if (clienteRepository.findByCpf(cliente.getCpf()).filter(c -> c.getId() != cliente.getId()).isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente com CPF " + cliente.getCpf() + " existente.");
        BeanUtils.copyProperties(cliente, clienteManaged);
        return clienteRepository.save(clienteManaged);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        log.info("Excluir cliente #" + id);
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente de ID " + id + " não encontrado"));
        clienteRepository.delete(cliente);
        return ResponseEntity.ok().build();
    }
}
