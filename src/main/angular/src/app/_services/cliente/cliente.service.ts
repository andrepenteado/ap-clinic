import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cliente } from "../../_entities/cliente";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl: string = environment.apiUrl + "/api/clientes";

  private cliente: Cliente = new Cliente();

  constructor(
    private httpClient: HttpClient
  ) { }

  public setCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  public getCliente() {
    return this.cliente;
  }

  public pesquisar(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.baseUrl);
  }

  public buscar(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  public gravar(cliente: Cliente): Observable<Cliente> {
    if (cliente.id > 0) {
      return this.httpClient.put<Cliente>(this.baseUrl, cliente);
    }
    else {
      return this.httpClient.post<Cliente>(this.baseUrl, cliente);
    }
  }

  public excluir(id: number): Observable<string> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }

}
