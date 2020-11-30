import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';

import { PedidosPesquisaComponent } from '../pedidos-pesquisa/pedidos-pesquisa.component';
import { PedidosCadastroComponent } from '../pedidos-cadastro/pedidos-cadastro.component';
import { PedidosService } from './pedidos.service';
import { PedidosRoutingModule } from './pedidos-routing.module';

@NgModule({
  declarations: [ PedidosPesquisaComponent, PedidosCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    PedidosRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputNumberModule,
    FileUploadModule,
    DropdownModule
  ],
  providers: [PedidosService]

})
export class PedidosModule { }
