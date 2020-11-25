import { LocalizacaoCadastroComponent } from './localizacao-cadastro/localizacao-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LocalizacaoPesquisaComponent } from './localizacao-pesquisa/localizacao-pesquisa.component';

const routes: Routes = [
  { path: 'localizacao', component: LocalizacaoPesquisaComponent },
  { path: 'localizacao/nova', component: LocalizacaoCadastroComponent },
  { path: 'localizacao/:codigo', component: LocalizacaoCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LocalizacaoRoutingModule { }
