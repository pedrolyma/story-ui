import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModeloCadastroComponent } from './modelo-cadastro/modelo-cadastro.component';
import { ModeloPesquisaComponent } from './modelo-pesquisa/modelo-pesquisa.component';
import { ModeloRoutingModule } from './modelo-routing.module';
import { ModeloService } from './modelo.service';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'primeng/api';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    ModeloRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    DropdownModule
  ],
  declarations: [
     ModeloPesquisaComponent,
     ModeloCadastroComponent],

  providers: [ModeloService]

})
export class ModeloModule { }
