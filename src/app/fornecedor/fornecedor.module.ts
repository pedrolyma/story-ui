import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from '../shared/shared.module';
import { FornecedorPesquisaComponent } from './fornecedor-pesquisa/fornecedor-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { FornecedorCadastroComponent } from './fornecedor-cadastro/fornecedor-cadastro.component';
import { FornecedorService } from './fornecedor.service';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    FornecedorRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputMaskModule,
    DropdownModule,

  ],
  declarations: [ FornecedorPesquisaComponent, FornecedorCadastroComponent ],
  providers: [FornecedorService],
exports: []
})
export class FornecedorModule { }
