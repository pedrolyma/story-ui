import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { LocalizacaoService } from './../localizacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalizacaoFiltro } from '../localizacao.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-localizacao-pesquisa',
  templateUrl: './localizacao-pesquisa.component.html',
  styleUrls: ['./localizacao-pesquisa.component.css']
})
export class LocalizacaoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LocalizacaoFiltro();
  localizacoes = [];
  @ViewChild('tabela') grid;

  constructor(
    private localizacaoService: LocalizacaoService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.localizacaoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.localizacoes = resultado.localizacoes;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(localizacao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(localizacao);
      }
    });
  }

  excluir(localizacao: any) {
    this.localizacaoService.excluir(localizacao.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Localizacao excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

alternarStatus(localizacao: any): void {
  const novoStatus = !localizacao.ativo;

  this.localizacaoService.mudarStatus(localizacao.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      localizacao.ativo = novoStatus;
      this.toasty.success(`Localizacao ${acao} com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
