import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';

import { SharedModule } from '../shared/shared.module';
import { MarcaPesquisaComponent } from './marca-pesquisa/marca-pesquisa.component';
import { MarcaService } from './marca.service';
import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaCadastroComponent } from './marca-cadastro/marca-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    MarcaRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [ MarcaPesquisaComponent, MarcaCadastroComponent ],
  providers: [MarcaService],
exports: []
})
export class MarcaModule { }
