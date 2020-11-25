import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Unidades } from '../model/Unidade.model';

export class UnidadeFiltro {
  pagina = 0;
  itensPorPagina = 5;
}
@Injectable({
  providedIn: 'root'
})

export class UnidadeService {
  unidadeUrl = 'http://localhost:8080/unidades';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: UnidadeFiltro): Promise<any> {
    const params = new HttpParams(); // HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'basic aqui ');

    params.set('pageNumber', filtro.pagina.toString());
    params.set('pageSize', filtro.itensPorPagina.toString());

    return this.http.get(`${this.unidadeUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const unidades = response['content'];
        const resultado = { unidades, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic aqui');

    return this.http.delete(`${this.unidadeUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(unidade: Unidades): Promise<Unidades> {
    return this.http.post(this.unidadeUrl, JSON.stringify(unidade))
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(unidade: Unidades): Promise<Unidades> {
    return this.http.put(`${this.unidadeUrl}/${unidade.codigo}`,
        JSON.stringify(unidade))
      .toPromise()
      .then(response => response['content'] as Unidades);
  }

  buscarPorCodigo(codigo: number): Promise<Unidades> {
    return this.http.get(`${this.unidadeUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Unidades);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.unidadeUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }
}
