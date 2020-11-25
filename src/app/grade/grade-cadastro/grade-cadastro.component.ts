import { FormControl } from '@angular/forms';
import { GradeService } from './../grade.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ErrorhandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { Grades } from 'src/app/model/Grade.model';

@Component({
  selector: 'app-grade-cadastro',
  templateUrl: './grade-cadastro.component.html',
  styleUrls: ['./grade-cadastro.component.css']
})
export class GradeCadastroComponent implements OnInit {

  grade = new Grades();

  constructor(
    private gradeService: GradeService,
    private toasty: ToastyService,
    private errorHandler: ErrorhandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoGrade = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Grade');
    if (codigoGrade) {
       this.carregarGrade(codigoGrade);
    }
  }

  get editando() {
    return Boolean(this.grade.codigo);
  }

  carregarGrade(codigo: number) {
    this.gradeService.buscarPorCodigo(codigo)
      .then(dados => {
        this.grade = dados;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarGrade(form);
    } else {
      this.adicionarGrade(form);
    }
  }

  adicionarGrade(form: FormControl) {
    this.gradeService.adicionar(this.grade)
      .then(gradeAdicionada => {
        this.toasty.success('Grade adicionado com sucesso!');
        this.router.navigate(['/grades', gradeAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarGrade(form: FormControl) {
    this.gradeService.atualizar(this.grade)
      .then(dados => {
        this.grade = dados;

        this.toasty.success('Grade alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.grade = new Grades();
    }.bind(this), 1);

    this.router.navigate(['/grades/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Grade: ${this.grade.intervalo}`);
  }
}
