import { UnidadePesquisaComponent } from './unidade-pesquisa/unidade-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UnidadeCadastroComponent } from './unidade-cadastro/unidade-cadastro.component';

const routes: Routes = [
  { path: 'unidades', component: UnidadePesquisaComponent },
  { path: 'unidades/nova', component: UnidadeCadastroComponent },
  { path: 'unidades/:codigo', component: UnidadeCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
