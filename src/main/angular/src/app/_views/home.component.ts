import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  template: `
    <app-breadcrumb>
      <li class="breadcrumb-item active">Página Inicial</li>
    </app-breadcrumb>
    <div class="text-center">
      <i class="fas fa-home fa-4x"></i>
      <h2>Página Inicial</h2>
      <p>Você está conectado através do IP <strong>{{ ip }}</strong></p>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  private ip: string;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get("https://api.ipify.org?format=json").subscribe(result => {
      this.ip = result['ip'];
    })
  }

}
