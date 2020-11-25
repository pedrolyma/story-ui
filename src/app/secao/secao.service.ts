import { Secoes } from '../model/Secoes.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { TagContentType } from '@angular/compiler';

// definindo contrato
export class SecaoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
 })

export class SecaoService {
  secaoUrl = 'http://localhost:8080/secoes';

  constructor(private http: HttpClient) { }

   pesquisar(filtro: SecaoFiltro): Promise<any> {
    const params = new HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    return this.http.get(`${this.secaoUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const secoes = response['content']
        const resultado = { secoes, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.secaoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.secaoUrl)
      .toPromise()
      .then(response => response['content']);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.secaoUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(secao: Secoes): Promise<Secoes> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Secoes>(this.secaoUrl, JSON.stringify(secao), { headers })
//    return this.http.post(this.secaoUrl, JSON.stringify(secao))
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(secao: Secoes): Promise<Secoes> {
    return this.http.put(`${this.secaoUrl}/${secao.codigo}`,
        JSON.stringify(secao))
      .toPromise()
      .then(response => response['content'] as Secoes);
  }

  buscarPorCodigo(codigo: number): Promise<Secoes> {
    return this.http.get(`${this.secaoUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Secoes);
  }
}
