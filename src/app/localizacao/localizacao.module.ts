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
import { LocalizacaoRoutingModule } from './localizacao-routing.module';
import { LocalizacaoPesquisaComponent } from './localizacao-pesquisa/localizacao-pesquisa.component';
import { LocalizacaoService } from './localizacao.service';
import { LocalizacaoCadastroComponent } from './localizacao-cadastro/localizacao-cadastro.component';

@NgModule({
  declarations: [ LocalizacaoPesquisaComponent, LocalizacaoCadastroComponent ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LocalizacaoRoutingModule
  ],
  providers: [LocalizacaoService]

})
export class LocalizacaoModule { }
