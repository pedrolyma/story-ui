import { Estados } from './../../model/Estado.model';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { FornecedorService } from './../fornecedor.service';
import { Fornecedores } from './../../model/Fornecedor.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-fornecedor-cadastro',
  templateUrl: './fornecedor-cadastro.component.html',
  styleUrls: ['./fornecedor-cadastro.component.css']
})

export class FornecedorCadastroComponent implements OnInit {

  fornecedor = new Fornecedores();

  estados: SelectItem[];
  selectedUF: string;

  constructor(
    private fornecedorService: FornecedorService,
    private toasty: ToastyService,
    private errorHandler: ErrorhandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoFornecedor = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo Fornecedor');
    if (codigoFornecedor) {
       this.carregarFornecedor(codigoFornecedor);
    }
    this.carregarEstados();
  }

  get editando() {
    return Boolean(this.fornecedor.codigo);
  }

  carregarFornecedor(codigo: number) {
    this.fornecedorService.buscarPorCodigo(codigo)
      .then(dados => {
        this.fornecedor = dados;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarFornecedor(form);
    } else {
      this.adicionarFornecedor(form);
    }
  }

  adicionarFornecedor(form: FormControl) {
    this.fornecedorService.adicionar(this.fornecedor)
      .then(fornecedorAdicionado => {
        this.toasty.success('Fornecedor adicionado com sucesso!');
        this.router.navigate(['/fornecedores', fornecedorAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarFornecedor(form: FormControl) {
    this.fornecedorService.atualizar(this.fornecedor)
      .then(dados => {
        this.fornecedor = dados;

        this.toasty.success('Fornecedor alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.fornecedor = new Fornecedores();
    }.bind(this), 1);

    this.router.navigate(['/fornecedores/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Fornecedor: ${this.fornecedor.razaoSocial}`);
  }

  carregarEstados() {
    this.estados = [
      {label: 'AC', value: 'AC'},
      {label: 'AL', value: 'AL'},
      {label: 'AP', value: 'AP'},
      {label: 'AM', value: 'AM'},
      {label: 'BA', value: 'BA'},
      {label: 'CE', value: 'CE'},
      {label: 'DF', value: 'DF'},
      {label: 'ES', value: 'ES'},
      {label: 'GO', value: 'GO'},
      {label: 'MA', value: 'MA'},
      {label: 'MT', value: 'MT'},
      {label: 'MS', value: 'MS'},
      {label: 'MG', value: 'MG'},
      {label: 'PA', value: 'PA'},
      {label: 'PB', value: 'PB'},
      {label: 'PR', value: 'PR'},
      {label: 'PE', value: 'PE'},
      {label: 'PI', value: 'PI'},
      {label: 'RJ', value: 'RJ'},
      {label: 'RN', value: 'RN'},
      {label: 'RS', value: 'RS'},
      {label: 'RO', value: 'RO'},
      {label: 'RR', value: 'RR'},
      {label: 'SC', value: 'SC'},
      {label: 'SP', value: 'SP'},
      {label: 'SE', value: 'SE'},
      {label: 'TO', value: 'TO'}
  ];


    return this.fornecedorService.listarTodos()
      .then(dados => {
        this.estados = dados;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
