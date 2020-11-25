import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Localizacao } from '../model/Localizacao.model';

// definindo contrato
export class LocalizacaoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
 })

export class LocalizacaoService {
  localizacaoUrl = 'http://localhost:8080/localizacao';

  constructor(private http: HttpClient) { }

   pesquisar(filtro: LocalizacaoFiltro): Promise<any> {
    const params = new HttpParams();
    const headers = new HttpHeaders();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    return this.http.get(`${this.localizacaoUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const localizacoes = response['content']
        const resultado = { localizacoes, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic aqui');

    return this.http.delete(`${this.localizacaoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.localizacaoUrl)
      .toPromise()
      .then(response => response['content']);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.localizacaoUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(localizacao: Localizacao): Promise<Localizacao> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Localizacao>(this.localizacaoUrl, JSON.stringify(localizacao), { headers })
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(localizacao: Localizacao): Promise<Localizacao> {
    return this.http.put(`${this.localizacaoUrl}/${localizacao.codigo}`,
        JSON.stringify(localizacao))
      .toPromise()
      .then(response => response['content'] as Localizacao);
  }

  buscarPorCodigo(codigo: number): Promise<Localizacao> {
    return this.http.get(`${this.localizacaoUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Localizacao);
  }
}
