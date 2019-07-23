import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../../_config/global.service";
import { Cliente } from "../../../_entities/cliente";
import { ClienteService } from "../../../_services/cliente.service";

@Component({
  selector: 'app-pesquisar-cliente',
  templateUrl: './pesquisar-cliente.component.html',
  styleUrls: ['./pesquisar-cliente.component.css']
})
export class PesquisarClienteComponent implements OnInit {

  private dtOptions: any;
  private iconIncluir: string = "fa-plus";
  private targetIncluir: string = "/ui/clientes/cadastro";
  private listaCliente: Cliente[];

  constructor(
    private global: GlobalService,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.dtOptions = this.global.dataTablesConfig;
    this.clienteService.pesquisarClientes().subscribe(resp => { this.listaCliente = resp });
  }

}
