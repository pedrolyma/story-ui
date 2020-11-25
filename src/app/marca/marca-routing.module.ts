import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MarcaCadastroComponent } from './marca-cadastro/marca-cadastro.component';
import { MarcaPesquisaComponent } from './marca-pesquisa/marca-pesquisa.component';

const routes: Routes = [
  { path: 'marcas', component: MarcaPesquisaComponent },
  { path: 'marcas/nova', component: MarcaCadastroComponent },
  { path: 'marcas/:codigo', component: MarcaCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
