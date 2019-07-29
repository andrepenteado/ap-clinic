import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Cliente } from "../../../_entities/cliente";
import { BsLocaleService } from "ngx-bootstrap";
import { ClienteService } from "../../../_services/cliente/cliente.service";
import { GlobalService } from "../../../_config/global.service";
import { ValidateBrService } from "angular-validate-br";

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
    private validarBR: ValidateBrService,
    private clienteService: ClienteService,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.submitted = false;
    this.cliente = this.clienteService.getCliente();
    this.bsLocale.use("pt-br");
    this.formCliente = this.fb.group({
      id: [ this.cliente.id ],
      dataCadastro: [ this.cliente.dataCadastro ],
      dataAtualizacao: [ this.cliente.dataAtualizacao ],
      nome: [ this.cliente.nome, Validators.required ],
      cpf: [ this.cliente.cpf, [ Validators.required, this.validarBR.cpf ] ],
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
        this.formCliente.get("dataCadastro").setValue(this.cliente.dataCadastro);
        this.formCliente.get("dataAtualizacao").setValue(this.cliente.dataAtualizacao);
        this.global.mensagemSucesso(`Cliente ${this.cliente.nome} gravado com sucesso!`);
      }, errorResult => {
        this.global.mensagemErro(`Erro ao gravar cliente ${this.cliente.nome}! ${errorResult.error.message}`,);
      });
    }
  }
}
