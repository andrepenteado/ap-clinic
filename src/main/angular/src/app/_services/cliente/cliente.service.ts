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
    console.log("Pesquisar clientes");
    return this.httpClient.get<Cliente[]>(this.baseUrl);
  }

  public buscar(id: number): Observable<Cliente> {
    console.log(`Buscar cliente #${id}`);
    return this.httpClient.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  public gravar(cliente: Cliente): Observable<Cliente> {
    if (cliente.id > 0) {
      console.log(`Editar cliente ${cliente.nome}`);
      return this.httpClient.put<Cliente>(this.baseUrl, cliente);
    }
    else {
      console.log(`Incluir cliente ${cliente.nome}`);
      return this.httpClient.post<Cliente>(this.baseUrl, cliente);
    }
  }

  public excluir(id: number): Observable<string> {
    console.log(`Excluir cliente #${id}`);
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }

}
