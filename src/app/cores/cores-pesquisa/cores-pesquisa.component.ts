import { Cores } from './../../model/Cores.model';
import { CoresFiltro } from '../cores.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CoresService } from 'src/app/cores/cores.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-cores-pesquisa',
  templateUrl: './cores-pesquisa.component.html',
  styleUrls: ['./cores-pesquisa.component.css']
})
export class CoresPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new CoresFiltro();
  cores = [];
  @ViewChild('tabela') grid;

  constructor(
    private coresService: CoresService,
    private errorHandler: ErrorhandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService) { }

  ngOnInit(): void {
   // navbar.Component.html.acaoNaTela="CORES";
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.coresService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.cores = resultado.cores;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(cor: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(cor);
      }
    });
  }

  excluir(cor: any) {
    this.coresService.excluir(cor.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Cor excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
