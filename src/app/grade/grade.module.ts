import { GradeService } from './grade.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GradeRoutingModule } from './grade-routing.module';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from '../shared/shared.module';
import { GradePesquisaComponent } from './grade-pesquisa/grade-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { GradeCadastroComponent } from './grade-cadastro/grade-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AccordionModule,
    GradeRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [ GradePesquisaComponent, GradeCadastroComponent ],
  providers: [GradeService],
exports: []
})
export class GradeModule { }
