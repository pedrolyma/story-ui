import { CoresCadastroComponent } from './cores-cadastro/cores-cadastro.component';
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
import { CoresPesquisaComponent } from './cores-pesquisa/cores-pesquisa.component';
import { CoresService } from './cores.service';
import { CoresRoutingModule } from './cores-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    CoresRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [ CoresPesquisaComponent, CoresCadastroComponent ],
  providers: [CoresService],
exports: []
})
export class CoresModule { }
