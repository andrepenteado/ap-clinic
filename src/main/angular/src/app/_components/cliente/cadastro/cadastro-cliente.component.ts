import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cliente } from "../../../_entities/cliente";
import { BsLocaleService } from "ngx-bootstrap";
import { ClienteService } from "../../../_services/cliente/cliente.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  private submitted: boolean;
  private cliente: Cliente;
  private formCliente: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bsLocale: BsLocaleService,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.cliente = this.clienteService.getCliente();
    this.bsLocale.use("pt-br");
    this.formCliente = this.fb.group({
      id: [ this.cliente.id ],
      nome: [ this.cliente.nome, Validators.required ],
      cpf: [ this.cliente.cpf, Validators.required ],
      dataNascimento: [ this.cliente.dataNascimento, Validators.required ],
      profissao: [ this.cliente.profissao ],
      email: [ this.cliente.email, Validators.email ],
      telefone: [ this.cliente.telefone ],
      celular: [ this.cliente.celular ],
      whatsapp: [ this.cliente.whatsapp ]
    });
  }

  get form() {
    return this.formCliente.controls;
  }

  gravar() {
    this.submitted = true;
    if (this.formCliente.valid) {
      this.cliente = this.formCliente.value;
      this.clienteService.gravar(this.cliente).subscribe(clienteAtualizado => {
        this.cliente = clienteAtualizado;
        this.formCliente.get("id").setValue(this.cliente.id);
        Swal.fire("Gravar Cliente", `Cliente ${this.cliente.nome} gravado com sucesso!`, 'success');
      }, errorResult => {
        Swal.fire("Gravar Cliente", `Erro ao gravar cliente ${this.cliente.nome}!<br>${errorResult.error.message}`, 'error');
      });
    }
  }
}
