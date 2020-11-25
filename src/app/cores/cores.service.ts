import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Cores } from '../model/Cores.model';

export class CoresFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CoresService {
  coresUrl = 'http://localhost:8080/cores';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: CoresFiltro): Promise<any> {
    const params = new HttpParams(); // HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'basic aqui ');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    return this.http.get(`${this.coresUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const cores = response['content'];
        const resultado = { cores, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.coresUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.coresUrl)
      .toPromise()
      .then(response => response['content']);
  }

  adicionar(cores: Cores): Promise<Cores> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Cores>(this.coresUrl, JSON.stringify(cores), { headers })

 //   return this.http.post(this.coresUrl, JSON.stringify(cores))
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(cores: Cores): Promise<Cores> {
    return this.http.put(`${this.coresUrl}/${cores.codigo}`,
        JSON.stringify(cores))
      .toPromise()
      .then(response => response['content'] as Cores);
  }

  buscarPorCodigo(codigo: number): Promise<Cores> {
    return this.http.get(`${this.coresUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Cores);
  }
}
