import { UnidadeService } from './unidade.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnidadeRoutingModule } from './unidade-routing.module';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from '../shared/shared.module';
import { UnidadePesquisaComponent } from './unidade-pesquisa/unidade-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { UnidadeCadastroComponent } from './unidade-cadastro/unidade-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    UnidadeRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [ UnidadePesquisaComponent, UnidadeCadastroComponent ],
  providers: [UnidadeService],
exports: []
})
export class UnidadeModule { }
