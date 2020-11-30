import { Secoes } from '../model/Secoes.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Produtos } from '../model/Produto.model';

// definindo contrato
export class ProdutoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
 })

export class ProdutoService {
  produtoUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

   pesquisar(filtro: ProdutoFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    return this.http.get(`${this.produtoUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const produtos = response['content']
        const resultado = { produtos, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.produtoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.produtoUrl)
      .toPromise()
      .then(response => response['content']);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.produtoUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(produto: Produtos): Promise<Produtos> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Produtos>(this.produtoUrl, JSON.stringify(produto), { headers })
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(produto: Produtos): Promise<Produtos> {
    return this.http.put(`${this.produtoUrl}/${produto.codigo}`,
        JSON.stringify(produto))
      .toPromise()
      .then(response => response['content'] as Produtos);
  }

  buscarPorCodigo(codigo: number): Promise<Produtos> {
    return this.http.get(`${this.produtoUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Produtos);
  }
}
