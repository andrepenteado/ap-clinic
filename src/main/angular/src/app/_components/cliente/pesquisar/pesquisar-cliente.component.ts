import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from "../../../_config/global.service";
import { Cliente } from "../../../_entities/cliente";
import { ClienteService } from "../../../_services/cliente/cliente.service";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

@Component({
  selector: 'app-pesquisar-cliente',
  templateUrl: './pesquisar-cliente.component.html',
  styleUrls: ['./pesquisar-cliente.component.css']
})
export class PesquisarClienteComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, { static: false })
  private dtElement: DataTableDirective;

  private dtOptions: any;

  private dtTrigger: Subject<any> = new Subject();

  private iconIncluir: string = "fa-plus";

  private listaClientes: Cliente[];

  constructor(
    private global: GlobalService,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dtOptions = this.global.dataTablesConfig;
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.pesquisar();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  pesquisar() {
    this.clienteService.pesquisar().subscribe((listaClientes: Cliente[]) => {
      this.listaClientes = listaClientes;
    }, errorResult => {
      this.global.mensagemErro(`Erro pesquisar listagem de clientes. ${errorResult.error.message}`);
    }, ()  => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
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
