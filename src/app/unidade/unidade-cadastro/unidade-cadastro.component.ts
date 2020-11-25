import { UnidadeService } from './../unidade.service';
import { Unidades } from './../../model/Unidade.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-unidade-cadastro',
  templateUrl: './unidade-cadastro.component.html',
  styleUrls: ['./unidade-cadastro.component.css']
})
export class UnidadeCadastroComponent implements OnInit {

  unidade = new Unidades();

  constructor(
    private unidadeService: UnidadeService,
    private toasty: ToastyService,
    private errorHandler: ErrorhandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoUnidade = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Unidade');
    if (codigoUnidade) {
       this.carregarUnidade(codigoUnidade);
    }
  }

  get editando() {
    return Boolean(this.unidade.codigo);
  }

  carregarUnidade(codigo: number) {
    this.unidadeService.buscarPorCodigo(codigo)
      .then(dados => {
        this.unidade = dados;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarUnidade(form);
    } else {
      this.adicionarUnidade(form);
    }
  }

  adicionarUnidade(form: FormControl) {
    this.unidadeService.adicionar(this.unidade)
      .then(unidadeAdicionada => {
        this.toasty.success('Unidade adicionada com sucesso!');
        this.router.navigate(['/unidades', unidadeAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarUnidade(form: FormControl) {
    this.unidadeService.atualizar(this.unidade)
      .then(dados => {
        this.unidade = dados;

        this.toasty.success('Unidade alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.unidade = new Unidades();
    }.bind(this), 1);

    this.router.navigate(['/unidades/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Unidade: ${this.unidade.descricao}`);
  }

}
