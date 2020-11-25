import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';

const routes: Routes = [
  { path: 'produtos', component: ProdutoPesquisaComponent },
  { path: 'produtos/nova', component: ProdutoCadastroComponent },
  { path: 'produtos/:codigo', component: ProdutoCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
