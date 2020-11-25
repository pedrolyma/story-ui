import { ErrorhandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { Secoes } from '../../model/Secoes.model';
import { Component, OnInit } from '@angular/core';
import { SecaoService } from '../secao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-secao-cadastro',
  templateUrl: './secao-cadastro.component.html',
  styleUrls: ['./secao-cadastro.component.css']
})
export class SecaoCadastroComponent implements OnInit {

  secao = new Secoes();

  constructor(
    private secaoService: SecaoService,
    private toasty: ToastyService,
    private errorHandler: ErrorhandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoSecao = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Seção');
    if (codigoSecao) {
       this.carregarSecao(codigoSecao);
    }
  }

  get editando() {
    return Boolean(this.secao.codigo);
  }

  carregarSecao(codigo: number) {
    this.secaoService.buscarPorCodigo(codigo)
      .then(secao => {
        this.secao = secao;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarSecao(form);
    } else {
      this.adicionarSecao(form);
    }
  }

  adicionarSecao(form: FormControl) {
    this.secaoService.adicionar(this.secao)
      .then(secaoAdicionada => {
        this.toasty.success('Seção adicionada com sucesso!');
        this.router.navigate(['/secoes', secaoAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarSecao(form: FormControl) {
    this.secaoService.atualizar(this.secao)
      .then(secao => {
        this.secao = secao;

        this.toasty.success('Seção alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.secao = new Secoes();
    }.bind(this), 1);

    this.router.navigate(['/secoes/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Seção: ${this.secao.descricao}`);
  }
}
