import { CoresCadastroComponent } from './cores-cadastro/cores-cadastro.component';
import { CoresPesquisaComponent } from './cores-pesquisa/cores-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'cores', component: CoresPesquisaComponent },
  { path: 'cores/nova', component: CoresCadastroComponent },
  { path: 'cores/:codigo', component: CoresCadastroComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoresRoutingModule { }
