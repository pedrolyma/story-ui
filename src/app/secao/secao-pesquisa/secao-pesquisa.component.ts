import { Secoes } from '../../model/Secoes.model';
import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from '../../core/error-handler.service';
import { SecaoService, SecaoFiltro } from '../secao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-secao-pesquisa',
  templateUrl: './secao-pesquisa.component.html',
  styleUrls: ['./secao-pesquisa.component.css']
})
export class SecaoPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new SecaoFiltro();
  secoes = [];
  @ViewChild('tabela') grid;

  constructor(
    private secaoService: SecaoService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService) { }

  ngOnInit(): void {
 //   this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.secaoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.secoes = resultado.secoes;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(secao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(secao);
      }
    });
  }

  excluir(secao: any) {
    this.secaoService.excluir(secao.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Seção excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

alternarStatus(secao: any): void {
  const novoStatus = !secao.ativo;

  this.secaoService.mudarStatus(secao.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      secao.ativo = novoStatus;
      this.toasty.success(`Secao ${acao} com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
