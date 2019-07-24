import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroClienteComponent } from "./_components/cliente/cadastro/cadastro-cliente.component";
import { PesquisarClienteComponent } from "./_components/cliente/pesquisar/pesquisar-cliente.component";


const routes: Routes = [
  { path: 'clientes/pesquisar', component: PesquisarClienteComponent },
  { path: 'clientes/cadastro', component: CadastroClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
