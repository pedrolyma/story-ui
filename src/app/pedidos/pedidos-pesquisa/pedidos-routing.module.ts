import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PedidosPesquisaComponent } from '../pedidos-pesquisa/pedidos-pesquisa.component';
import { PedidosCadastroComponent } from '../pedidos-cadastro/pedidos-cadastro.component';

const routes: Routes = [
  { path: 'pedidos', component: PedidosPesquisaComponent },
  { path: 'pedidos/nova', component: PedidosCadastroComponent },
  { path: 'pedidos/:codigo', component: PedidosCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
