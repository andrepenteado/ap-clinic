package com.gitlab.andrepenteado.apclinic.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table
@Data
@EqualsAndHashCode(of = { "cpf" })
@ToString(of = { "nome" })
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotBlank
    private String nome;

    @Column
    @NotBlank
    private String cpf;

    @Column
    @NotNull
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;

    @Column
    private String profissao;

    @Column
    @Email
    private String email;

    @Column
    private String telefone;

    @Column
    private String celular;

    @Column
    private Boolean whatsapp;
}