import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FornecedorCadastroComponent } from './fornecedor-cadastro/fornecedor-cadastro.component';
import { FornecedorPesquisaComponent } from './fornecedor-pesquisa/fornecedor-pesquisa.component';

const routes: Routes = [
  { path: 'fornecedores', component: FornecedorPesquisaComponent },
  { path: 'fornecedores/nova', component: FornecedorCadastroComponent },
  { path: 'fornecedores/:codigo', component: FornecedorCadastroComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
