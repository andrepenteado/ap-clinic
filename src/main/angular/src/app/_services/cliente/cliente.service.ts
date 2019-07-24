import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Cliente } from "../../_entities/cliente";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl: string = environment.apiUrl + "/api/cliente";

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

  public incluir(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.baseUrl, cliente);
  }

  public editar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.baseUrl}/${id}`, cliente);
  }

  public excluir(id: number): Observable<string> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }

}
