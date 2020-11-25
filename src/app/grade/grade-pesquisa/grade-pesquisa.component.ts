import { ErrorhandlerService } from './../../core/error-handler.service';
import { GradeFiltro, GradeService } from './../grade.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-grade-pesquisa',
  templateUrl: './grade-pesquisa.component.html',
  styleUrls: ['./grade-pesquisa.component.css']
})
export class GradePesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new GradeFiltro();
  grades = [];
  @ViewChild('tabela') grid;

  constructor(
    private gradeService: GradeService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.gradeService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.grades = resultado.grades;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(grade: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(grade);
      }
    });
  }

  excluir(grade: any) {
    this.gradeService.excluir(grade.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Grade excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
