import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Grades } from '../model/Grade.model';
import { Unidades } from '../model/Unidade.model';

export class GradeFiltro {
  intervalo: string;
  pagina = 0;
  itensPorPagina = 5;
}
@Injectable({
  providedIn: 'root'
})

export class GradeService {
  gradeUrl = 'http://localhost:8080/grades';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: GradeFiltro): Promise<any> {
    const params = new HttpParams(); // HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'basic aqui ');

    params.set('pageNumber', filtro.pagina.toString());
    params.set('pageSize', filtro.itensPorPagina.toString());

    return this.http.get(`${this.gradeUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const grades = response['content'];
        const resultado = { grades, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic aqui');

    return this.http.delete(`${this.gradeUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(grade: Grades): Promise<Grades> {
    return this.http.post(this.gradeUrl, JSON.stringify(grade))
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(grade: Grades): Promise<Grades> {
    return this.http.put(`${this.gradeUrl}/${grade.codigo}`,
        JSON.stringify(grade))
      .toPromise()
      .then(response => response['content'] as Grades);
  }

  buscarPorCodigo(codigo: number): Promise<Grades> {
    return this.http.get(`${this.gradeUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Grades);
  }
}
