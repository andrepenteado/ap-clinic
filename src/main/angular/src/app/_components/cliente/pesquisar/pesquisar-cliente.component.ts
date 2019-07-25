import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../../_config/global.service";
import { Cliente } from "../../../_entities/cliente";
import { ClienteService } from "../../../_services/cliente/cliente.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.clienteService.pesquisar().subscribe((listaClientes: Cliente[]) => {
      this.listaClientes = listaClientes;
      this.completeFetch = true;
    });
    this.dtOptions = this.global.dataTablesConfig;
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
    Swal.fire(`Excluir cliente #${id}?`, `Confirmar exclusão do cliente ${nome}?`, "question")
  }
}
