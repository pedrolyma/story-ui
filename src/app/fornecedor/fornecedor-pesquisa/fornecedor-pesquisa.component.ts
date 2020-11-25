import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { FornecedorFiltro, FornecedorService } from './../fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-fornecedor-pesquisa',
  templateUrl: './fornecedor-pesquisa.component.html',
  styleUrls: ['./fornecedor-pesquisa.component.css']
})
export class FornecedorPesquisaComponent implements OnInit {

  totalRegistros: 0;
  filtro = new FornecedorFiltro();
  fornecedores = [];
  @ViewChild('tabela') grid;

  constructor(
    private fornecedorService: FornecedorService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.fornecedorService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.fornecedores = resultado.fornecedores;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(fornecedor: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(fornecedor);
      }
    });
  }

  excluir(fornecedor: any) {
    this.fornecedorService.excluir(fornecedor.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Fornecedor excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

alternarStatus(fornecedor: any): void {
  const novoStatus = !fornecedor.ativo;

  this.fornecedorService.mudarStatus(fornecedor.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      fornecedor.ativo = novoStatus;
      this.toasty.success(`Fornecedor ${acao} com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
