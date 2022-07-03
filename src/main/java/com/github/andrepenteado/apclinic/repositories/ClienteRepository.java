package com.github.andrepenteado.apclinic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.andrepenteado.apclinic.entities.Cliente;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByCpf(String cpf);
}
