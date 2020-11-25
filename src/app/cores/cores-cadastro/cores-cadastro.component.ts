import { Cores } from './../../model/Cores.model';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { CoresService } from './../cores.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cores-cadastro',
  templateUrl: './cores-cadastro.component.html',
  styleUrls: ['./cores-cadastro.component.css']
})
export class CoresCadastroComponent implements OnInit {

  cores = new Cores();

  constructor(
    private coresService: CoresService,
    private toasty: ToastyService,
    private errorHandler: ErrorhandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) { }

  ngOnInit(): void {
    const codigoCor = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Cor');
    if (codigoCor) {
        this.carregarCores(codigoCor);
    }
  }

  get editando() {
    return Boolean(this.cores.codigo);
  }

  carregarCores(codigo: number) {
    this.coresService.buscarPorCodigo(codigo)
      .then(cores => {
        this.cores = cores;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCores(form);
    } else {
      this.adicionarCores(form);
    }
  }

  adicionarCores(form: FormControl) {
    this.coresService.adicionar(this.cores)
      .then(corAdicionada => {
        this.toasty.success('Cor adicionada com sucesso!');
        this.router.navigate(['/cores', corAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCores(form: FormControl) {
    this.coresService.atualizar(this.cores)
      .then(cores => {
        this.cores = cores;

        this.toasty.success('Cor alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.cores = new Cores();
    }.bind(this), 1);

    this.router.navigate(['/cores/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Cor: ${this.cores.descricao}`);
  }

}
