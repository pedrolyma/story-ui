import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Marcas } from '../model/Marca.model';

export class MarcaFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  marcaUrl = 'http://localhost:8080/marcas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: MarcaFiltro): Promise<any> {
    let params = new HttpParams(); // HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'basic aqui ');
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    return this.http.get(`${this.marcaUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const marcas = response['content'];
        const resultado = { marcas,
           total: response['totalElements']
        };
        return resultado;
      })
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic aqui');

    return this.http.delete(`${this.marcaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.marcaUrl)
      .toPromise()
      .then(response => response['content']);
  }

  mudarStatus(codigo: number, statusmarca: boolean): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');
    return this.http.put(`${this.marcaUrl}/${codigo}/statusmarca`, statusmarca, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(marca: Marcas): Promise<Marcas> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Marcas>(this.marcaUrl, JSON.stringify(marca), { headers })
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(marca: Marcas): Promise<Marcas> {
    return this.http.put(`${this.marcaUrl}/${marca.codigo}`,
        JSON.stringify(marca))
      .toPromise()
      .then(response => response['content'] as Marcas);
  }

  buscarPorCodigo(codigo: number): Promise<Marcas> {
    return this.http.get(`${this.marcaUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Marcas);
  }
}
