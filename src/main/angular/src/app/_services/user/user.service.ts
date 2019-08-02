import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserLogin } from "../../_entities/user-login";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.ssoUrl + "/user";

  constructor(
    private httpCliente: HttpClient
  ) { }

  public usuarioLogado(): Observable<UserLogin> {
    return this.httpCliente.get<UserLogin>(this.baseUrl);
  }

}
