import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { ModeloService, ModeloFiltro } from './../modelo.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-modelo-pesquisa',
  templateUrl: './modelo-pesquisa.component.html',
  styleUrls: ['./modelo-pesquisa.component.css']
})
export class ModeloPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ModeloFiltro();
  modelos = [];
  @ViewChild('tabela') grid;

  constructor(
    private modeloService: ModeloService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.modeloService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.modelos = resultado.modelos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(modelo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(modelo);
      }
    });
  }

  excluir(modelo: any) {
    this.modeloService.excluir(modelo.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Modelo excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

alternarStatus(modelo: any): void {
  const novoStatus = !modelo.ativo;

  this.modeloService.mudarStatus(modelo.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      modelo.ativo = novoStatus;
      this.toasty.success(`Modelo ${acao} com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
