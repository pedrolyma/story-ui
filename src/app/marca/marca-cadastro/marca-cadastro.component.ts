import { Title } from '@angular/platform-browser';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { MarcaService } from './../marca.service';
import { Marcas } from './../../model/Marca.model';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-marca-cadastro',
  templateUrl: './marca-cadastro.component.html',
  styleUrls: ['./marca-cadastro.component.css']
})
export class MarcaCadastroComponent implements OnInit {

  marca = new Marcas();

  constructor(
    private marcaService: MarcaService,
    private toasty: ToastyService,
    private errorHandler: ErrorhandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoMarca = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Marca');
    if (codigoMarca) {
       this.carregarMarca(codigoMarca);
    }
  }

  get editando() {
    return Boolean(this.marca.codigo);
  }

  carregarMarca(codigo: number) {
    this.marcaService.buscarPorCodigo(codigo)
      .then(dados => {
        this.marca = dados;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarMarca(form);
    } else {
      this.adicionarMarca(form);
    }
  }

  adicionarMarca(form: FormControl) {
    this.marcaService.adicionar(this.marca)
      .then(marcaAdicionada => {
        this.toasty.success('Marca adicionada com sucesso!');
        this.router.navigate(['/marcas', marcaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarMarca(form: FormControl) {
    this.marcaService.atualizar(this.marca)
      .then(dados => {
        this.marca = dados;

        this.toasty.success('Marca alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.marca = new Marcas();
    }.bind(this), 1);

    this.router.navigate(['/marcas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Marca: ${this.marca.descricao}`);
  }
}
