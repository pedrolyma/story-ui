import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { ProdutoFiltro, ProdutoService } from './../produto.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-produto-pesquisa',
  templateUrl: './produto-pesquisa.component.html',
  styleUrls: ['./produto-pesquisa.component.css']
})
export class ProdutoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ProdutoFiltro();
  produtos = [];
  @ViewChild('tabela') grid;

  constructor(
    private produtoService: ProdutoService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.produtoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.produtos = resultado.produtos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(produto: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(produto);
      }
    });
  }

  excluir(produto: any) {
    this.produtoService.excluir(produto.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Produto excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

alternarStatus(produto: any): void {
  const novoStatus = !produto.ativo;

  this.produtoService.mudarStatus(produto.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      produto.ativo = novoStatus;
      this.toasty.success(`Produto ${acao} com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
