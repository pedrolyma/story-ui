import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Modelos } from '../model/Modelo.model';

// definindo contrato
export class ModeloFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
 })

export class ModeloService {
  modeloUrl = 'http://localhost:8080/modelos';

  secoes = [];
  constructor(private http: HttpClient) { }

   pesquisar(filtro: ModeloFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    return this.http.get(`${this.modeloUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const modelos = response['content']
        const resultado = { modelos, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.modeloUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.modeloUrl)
      .toPromise()
      .then(response => response['content']);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.modeloUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(modelo: Modelos): Promise<Modelos> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Modelos>(this.modeloUrl, JSON.stringify(modelo), { headers })
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(modelo: Modelos): Promise<Modelos> {
    return this.http.put(`${this.modeloUrl}/${modelo.codigo}`,
        JSON.stringify(modelo))
      .toPromise()
      .then(response => response['content'] as Modelos);
  }

  buscarPorCodigo(codigo: number): Promise<Modelos> {
    return this.http.get(`${this.modeloUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Modelos);
  }
}
