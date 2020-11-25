import { ConfirmationService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';

import { ProdutoService } from './../produto/produto.service';
import { GradeService } from './../grade/grade.service';
import { ModeloService } from './../modelo/modelo.service';
import { MarcaService } from './../marca/marca.service';
import { UnidadeService } from './../unidade/unidade.service';
import { LocalizacaoService } from './../localizacao/localizacao.service';
import { ErrorhandlerService } from './error-handler.service';
import { SecaoService } from './../secao/secao.service';
import { CoresService } from '../cores/cores.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { FornecedorService } from '../fornecedor/fornecedor.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    HttpClientModule,
    MenubarModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent],

  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule],

  providers: [
    SecaoService,
    ErrorhandlerService,
    ConfirmationService,
    Title,
    CoresService,
    LocalizacaoService,
    UnidadeService,
    MarcaService,
    ModeloService,
    FornecedorService,
    GradeService,
    ProdutoService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
