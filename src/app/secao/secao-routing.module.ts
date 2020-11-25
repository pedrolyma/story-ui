import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SecaoPesquisaComponent } from './secao-pesquisa/secao-pesquisa.component';
import { SecaoCadastroComponent } from './secao-cadastro/secao-cadastro.component';

const routes: Routes = [
  { path: 'secoes', component: SecaoPesquisaComponent },
  { path: 'secoes/nova', component: SecaoCadastroComponent },
  { path: 'secoes/:codigo', component: SecaoCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SecaoRoutingModule { }
