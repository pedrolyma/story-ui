import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { MarcaFiltro, MarcaService } from './../marca.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-marca-pesquisa',
  templateUrl: './marca-pesquisa.component.html',
  styleUrls: ['./marca-pesquisa.component.css']
})
export class MarcaPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new MarcaFiltro();
  marcas = [];
  @ViewChild('tabela') grid;

  constructor(
    private marcaService: MarcaService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
              ) { }

  ngOnInit(): void {
  }

 pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.marcaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.marcas = resultado.marcas;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(marca: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(marca);
      }
    });
  }

  excluir(marca: any) {
    this.marcaService.excluir(marca.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Marca excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

alternarStatus(marca: any): void {
  const novoStatus = !marca.ativo;

  this.marcaService.mudarStatus(marca.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      marca.ativo = novoStatus;
      this.toasty.success(`Marca ${acao} com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
}

}
