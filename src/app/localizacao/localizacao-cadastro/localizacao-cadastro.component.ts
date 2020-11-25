import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { LocalizacaoService } from './../localizacao.service';
import { Localizacao } from './../../model/Localizacao.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-localizacao-cadastro',
  templateUrl: './localizacao-cadastro.component.html',
  styleUrls: ['./localizacao-cadastro.component.css']
})
export class LocalizacaoCadastroComponent implements OnInit {

  localizacao = new Localizacao();

  constructor(
    private localizacaoService: LocalizacaoService,
    private errorHandler: ErrorhandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoLocalizacao = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Localizacao');
    if (codigoLocalizacao) {
       this.carregarLocalizacao(codigoLocalizacao);
    }
  }

  get editando() {
    return Boolean(this.localizacao.codigo);
  }

  carregarLocalizacao(codigo: number) {
    this.localizacaoService.buscarPorCodigo(codigo)
      .then(dados => {
        this.localizacao = dados;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLocalizacao(form);
    } else {
      this.adicionarLocalizacao(form);
    }
  }

  adicionarLocalizacao(form: FormControl) {
    this.localizacaoService.adicionar(this.localizacao)
      .then(localizacaoAdicionada => {
        this.toasty.success('Localização adicionada com sucesso!');
        this.router.navigate(['/localizacoes', localizacaoAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLocalizacao(form: FormControl) {
    this.localizacaoService.atualizar(this.localizacao)
      .then(dados => {
        this.localizacao = dados;

        this.toasty.success('Localização alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.localizacao = new Localizacao();
    }.bind(this), 1);

    this.router.navigate(['/localizacoes/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Localização: ${this.localizacao.descricao}`);
  }
}
