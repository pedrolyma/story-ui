import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModeloPesquisaComponent } from './modelo-pesquisa/modelo-pesquisa.component';
import { ModeloCadastroComponent } from './modelo-cadastro/modelo-cadastro.component';

const routes: Routes = [
  { path: 'modelos', component: ModeloPesquisaComponent },
  { path: 'modelos/nova', component: ModeloCadastroComponent },
  { path: 'modelos/:codigo', component: ModeloCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ModeloRoutingModule { }
