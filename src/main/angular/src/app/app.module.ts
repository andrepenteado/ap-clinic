import { defineLocale } from "ngx-bootstrap/chronos";
import { ptBrLocale } from "ngx-bootstrap/locale";
defineLocale('pt-br', ptBrLocale);

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxMaskModule } from "ngx-mask";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { DataTablesModule } from "angular-datatables";

import { AppComponent } from './app.component';
import { GlobalService } from "./_config/global.service";
import { ToolbarComponent } from './_views/toolbar.component';
import { MenuComponent } from './_views/menu.component';
import { CadastroClienteComponent } from './_components/cliente/cadastro/cadastro-cliente.component';
import { PesquisarClienteComponent } from './_components/cliente/pesquisar/pesquisar-cliente.component';
import { FloatingButtonComponent } from './_views/floating-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    FloatingButtonComponent,
    CadastroClienteComponent,
    PesquisarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }