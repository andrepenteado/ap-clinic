import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  readonly dataTablesConfig: any = {
    lengthMenu: [ [10, -1], ["Sim", "Não"] ],
    pagingType: "simple_numbers",
    language: {
      lengthMenu: "Paginar? _MENU_",
      loadingRecords: "Aguarde, carregando...",
      processing: "Aguarde, em processamento...",
      info: "Registro _START_ até _END_. Total de _TOTAL_",
      infoFiltered: "(Máximo de _MAX_)",
      infoEmpty: "Nenhum dado retornado",
      search: "Filtrar",
      emptyTable: "Não existem dados a serem exibidos",
      paginate: {
        first: "<i class='fas fa-step-backward'></i>",
        last: "<i class='fas fa-step-forward'></i>",
        next: "<i class='fas fa-forward'></i>",
        previous: "<i class='fas fa-backward'></i>",
      }
    },
    responsive: true,
    dom: "<'row'" +
      "<'d-none d-sm-block col-sm-4 col-md-4'l>" +
      "<'d-none d-sm-block col-sm-4 col-md-4'B>" +
      "<'col-12 col-sm-4 col-md-4'f>" +
      ">" +
      "<'row'" +
      "<'col-12 col-sm-12 col-md-12'rt>" +
      ">" +
      "<'row'" +
      "<'d-none d-sm-block col-sm-6 col-md-6'i>" +
      "<'col-12 col-sm-6 col-md-6'p>" +
      ">",
    buttons: [
      {
        extend: 'excel',
        title: 'dados-tabela',
        className: 'btn btn-light border',
        text: '<i class="fas fa-download" title="Download"></i>',
        exportOptions: {
          columns: ':visible'
        }
      },
      {
        extend: 'print',
        className: 'btn btn-light border',
        text: '<i class="fas fa-print" title="Imprimir"></i>',
        exportOptions: {
          columns: ':visible'
        }
      },
      {
        extend: 'colvis',
        className: 'btn btn-light border',
        text: '<i class="fas fa-eye" title="Selecionar Colunas"></i>'
      }
    ]
  };

  mensagemInformacao(mensagem: string) {
    Swal.fire({
      type: "info",
      title: "Informação",
      text: mensagem,
      showCloseButton: true
    });
  }

  mensagemErro(mensagem: string) {
    Swal.fire({
      type: "error",
      title: "Erro!",
      text: mensagem,
      showCloseButton: true
    });
  }

  mensagemSucesso(mensagem: string) {
    Swal.fire({
      type: "success",
      title: "Sucesso",
      text: mensagem,
      showCloseButton: true
    });
  }

  mensagemAtencao(mensagem: string) {
    Swal.fire({
      type: "warning",
      title: "Atenção!",
      text: mensagem,
      showCloseButton: true
    });
  }

  confirmar(mensagem: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Confirmar?",
      text: mensagem,
      type: "question",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "<span class='fas fa-save'> Sim</span>",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    });
  }

  confirmarExclusao(mensagem: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: "Atenção!",
      text: mensagem,
      type: "question",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "<span class='fas fa-trash-alt'> Excluir</span>",
      confirmButtonColor: "#c9302c",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    });
  }

  public breadcrumb;
}
