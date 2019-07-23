package com.gitlab.andrepenteado.apclinic.repositories;

import com.gitlab.andrepenteado.apclinic.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
