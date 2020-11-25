import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { ProdutoService } from './../produto.service';
import { Produtos } from './../../model/Produto.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SecaoService } from 'src/app/secao/secao.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produto = new Produtos();
  secoes: [];
  marcas: [];
  modelos: [];
  grades: [];
  cores: [];
  unidades: [];
  localizacao: [];
  fornecedores: [];

  constructor(
    private produtoService: ProdutoService,
    private errorHandler: ErrorhandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private secaoService: SecaoService
  ) { }

  ngOnInit(): void {
    const codigoProduto = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo Produto');
    if (codigoProduto) {
       this.carregarProduto(codigoProduto);
    }
    this.carregarSecoes();
  }

  get editando() {
    return Boolean(this.produto.codigo);
  }

  carregarProduto(codigo: number) {
    this.produtoService.buscarPorCodigo(codigo)
      .then(dados => {
        this.produto = dados;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProduto(form);
    } else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: FormControl) {
    this.produtoService.adicionar(this.produto)
      .then(produtoAdicionado => {
        this.toasty.success('Produto adicionado com sucesso!');
        this.router.navigate(['/produtos', produtoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProduto(form: FormControl) {
    this.produtoService.atualizar(this.produto)
      .then(dados => {
        this.produto = dados;

        this.toasty.success('Produto alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.produto = new Produtos();
    }.bind(this), 1);

    this.router.navigate(['/produtos/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Produto: ${this.produto.descricao}`);
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
