import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cliente } from "../_entities/cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public pesquisarClientes() {
    return this.httpClient.get<Cliente[]>('http://localhost:30002/ap-clinic/api/clientes');
  }
}
