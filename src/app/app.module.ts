import { PaginatorModule } from 'primeng/paginator';
import { Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SecaoModule } from './secao/secao.module';
import { CoreModule } from './core/core.module';
import { CoresModule } from './cores/cores.module';
import { MarcaModule } from './marca/marca.module';
import { UnidadeModule } from './unidade/unidade.module';
import { LocalizacaoModule } from './localizacao/localizacao.module';
import { MenubarModule } from 'primeng/menubar';
import { ModeloModule } from './modelo/modelo.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ProdutoModule } from './produto/produto.module';
import { GradeModule } from './grade/grade.module';
import { PedidosModule } from './pedidos/pedidos-pesquisa/pedidos.module';

const routes: Routes = []
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SecaoModule,
    CoreModule,
    CoresModule,
    MarcaModule,
    UnidadeModule,
    LocalizacaoModule,
    FornecedorModule,
    GradeModule,
    ModeloModule,
    ProdutoModule,
    MenubarModule,
    PaginatorModule,
    PedidosModule
    ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
