import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { UnidadeFiltro, UnidadeService } from './../unidade.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-unidade-pesquisa',
  templateUrl: './unidade-pesquisa.component.html',
  styleUrls: ['./unidade-pesquisa.component.css']
})
export class UnidadePesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new UnidadeFiltro();
  unidades = [];
  @ViewChild('tabela') grid;

  constructor(
    private unidadeService: UnidadeService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
    ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.unidadeService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.unidades = resultado.unidades;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(unidade: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(unidade);
      }
    });
  }

  excluir(unidade: any) {
    this.unidadeService.excluir(unidade.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Unidade excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(unidade: any): void {
    const novoStatus = !unidade.ativo;

    this.unidadeService.mudarStatus(unidade.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        unidade.ativo = novoStatus;
        this.toasty.success(`Unidade ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
