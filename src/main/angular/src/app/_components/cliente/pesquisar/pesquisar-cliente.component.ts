import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../../_config/global.service";
import { Cliente } from "../../../_entities/cliente";
import { ClienteService } from "../../../_services/cliente/cliente.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-pesquisar-cliente',
  templateUrl: './pesquisar-cliente.component.html',
  styleUrls: ['./pesquisar-cliente.component.css']
})
export class PesquisarClienteComponent implements OnInit {

  private dtOptions: any;
  private iconIncluir: string = "fa-plus";
  private listaClientes: Cliente[];
  private completeFetch: boolean = false;

  constructor(
    private global: GlobalService,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pesquisar();
    this.dtOptions = this.global.dataTablesConfig;
  }

  pesquisar() {
    this.clienteService.pesquisar().subscribe((listaClientes: Cliente[]) => {
      this.listaClientes = listaClientes;
      this.completeFetch = true;
    });
  }

  incluir() {
    this.clienteService.setCliente(new Cliente());
    this.router.navigate(["/clientes/cadastro"]);
  }

  editar(cliente: Cliente) {
    this.clienteService.setCliente(cliente);
    this.router.navigate(["/clientes/cadastro"]);
  }

  excluir(id: number, nome: string) {
    this.global.confirmarExclusao(`Confirmar exclusão do cliente ${nome}?`).then((result) => {
      if (result.value) {
        this.clienteService.excluir(id).subscribe(result => {
          this.pesquisar();
        },errorResult => {
          this.global.mensagemErro(`Erro ao excluir cliente ${nome}. ${errorResult.error.message}`);
        })
      }
    });
  }
}
