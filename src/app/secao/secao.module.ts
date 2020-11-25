import { SecaoService } from './secao.service';
import { HttpClientModule } from '@angular/common/http';
import { SecaoRoutingModule } from './secao-routing.module';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { SecaoPesquisaComponent } from './secao-pesquisa/secao-pesquisa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecaoCadastroComponent } from './secao-cadastro/secao-cadastro.component';

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
    BrowserAnimationsModule
  ],
  providers: [SecaoService]

})
export class SecaoModule { }
