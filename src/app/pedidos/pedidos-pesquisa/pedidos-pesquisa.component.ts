import { PedidoFiltro } from './pedidos.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { PedidosService } from './pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css']
})
export class PedidosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PedidoFiltro();
  pedidos = [];
  @ViewChild('tabela') grid;

  constructor(
    private pedidoService: PedidosService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
    ) { }

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pedidoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pedidos = resultado.produtos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pedido: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pedido);
      }
    });
  }

  excluir(pedido: any) {
    this.pedidoService.excluir(pedido.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Pedido excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

alternarStatus(pedido: any): void {
  const novoStatus = !pedido.ativo;

  this.pedidoService.mudarStatus(pedido.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      pedido.ativo = novoStatus;
      this.toasty.success(`Pedido ${acao} com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
