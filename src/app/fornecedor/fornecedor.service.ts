import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Fornecedores } from '../model/Fornecedor.model';

export class FornecedorFiltro {
  pagina = 0;
  itensPorPagina = 5;
  razaoSocial: string;
}
@Injectable({
  providedIn: 'root'
})

export class FornecedorService {
  fornecedorUrl = 'http://localhost:8080/fornecedores';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: FornecedorFiltro): Promise<any> {
    const params = new HttpParams(); // HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'basic aqui ');

    params.set('pageNumber', filtro.pagina.toString());
    params.set('pageSize', filtro.itensPorPagina.toString());

    return this.http.get(`${this.fornecedorUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const fornecedores = response['content'];
        const resultado = { fornecedores, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic aqui');

    return this.http.delete(`${this.fornecedorUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(fornecedor: Fornecedores): Promise<Fornecedores> {
    return this.http.post(this.fornecedorUrl, JSON.stringify(fornecedor))
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(fornecedor: Fornecedores): Promise<Fornecedores> {
    return this.http.put(`${this.fornecedorUrl}/${fornecedor.codigo}`,
        JSON.stringify(fornecedor))
      .toPromise()
      .then(response => response['content'] as Fornecedores);
  }

  buscarPorCodigo(codigo: number): Promise<Fornecedores> {
    return this.http.get(`${this.fornecedorUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Fornecedores);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.fornecedorUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  listarTodos(): Promise<any> {
    return this.http.get(this.fornecedorUrl)
      .toPromise()
      .then(response => response['content']);
  }
}
