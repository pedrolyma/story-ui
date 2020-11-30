import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { PaginatorModule } from 'primeng/paginator';

import { SecaoRoutingModule } from './secao-routing.module';
import { SecaoPesquisaComponent } from './secao-pesquisa/secao-pesquisa.component';
import { SecaoCadastroComponent } from './secao-cadastro/secao-cadastro.component';
import { SecaoService } from './secao.service';

@NgModule({
  declarations: [ SecaoPesquisaComponent, SecaoCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    SecaoRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PaginatorModule
  ],
  providers: [SecaoService]

})
export class SecaoModule { }
