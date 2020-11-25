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

import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoService } from './produto.service';
import { ProdutoRoutingModule } from './produto-routing.module';

@NgModule({
  declarations: [ ProdutoPesquisaComponent, ProdutoCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    ProdutoRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputNumberModule,
    FileUploadModule,
    DropdownModule
  ],
  providers: [ProdutoService]

})
export class ProdutoModule { }
