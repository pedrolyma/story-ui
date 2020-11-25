import { GradePesquisaComponent } from './grade-pesquisa/grade-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GradeCadastroComponent } from './grade-cadastro/grade-cadastro.component';

const routes: Routes = [
  { path: 'grades', component: GradePesquisaComponent },
  { path: 'grades/nova', component: GradeCadastroComponent },
  { path: 'grades/:codigo', component: GradeCadastroComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
