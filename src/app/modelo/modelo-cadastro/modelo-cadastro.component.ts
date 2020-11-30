import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormBuilder, FormGroup, Validator } from '@angular/forms';

import { ModeloService } from './../modelo.service';
import { Modelos } from './../../model/Modelo.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from 'src/app/core/error-handler.service';
import { SecaoService } from 'src/app/secao/secao.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modelo-cadastro',
  templateUrl: './modelo-cadastro.component.html',
  styleUrls: ['./modelo-cadastro.component.css']
})
export class ModeloCadastroComponent implements OnInit {

  modelo = new Modelos();
  secoes = [];
  formulario: FormGroup;

  constructor(
    private modeloService: ModeloService,
    private toasty: ToastyService,
    private errorHandler: ErrorhandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private secaoService: SecaoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const codigoModelo = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo Modelo');
    if (codigoModelo) {
       this.carregarModelo(codigoModelo);
    }
    this.carregarSecoes();
  }

  get editando() {
    return Boolean(this.modelo.codigo);
  }

  carregarModelo(codigo: number) {
    this.modeloService.buscarPorCodigo(codigo)
      .then(modelo => {
        this.modelo = modelo;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarModelo(form);
    } else {
      this.adicionarModelo(form);
    }
  }

  adicionarModelo(form: FormControl) {
    this.modeloService.adicionar(this.modelo)
      .then(modeloAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Modelo adicionado com sucesso!' });
        // this.toasty.success('Modelo adicionada com sucesso!');
        this.router.navigate(['/modelos', modeloAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarModelo(form: FormControl) {
    this.modeloService.atualizar(this.modelo)
      .then(modelo => {
        this.modelo = modelo;

        this.toasty.success('Modelo alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.modelo = new Modelos();
    }.bind(this), 1);

    this.router.navigate(['/modelos/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Modelo: ${this.modelo.descricao}`);
  }

  carregarSecoes() {
    return this.secaoService.listarTodas()
      .then(dados => {
        this.secoes = dados
          .map(c => ({ label: c.descricao, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
