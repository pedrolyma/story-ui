import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Pedidos } from 'src/app/model/pedidos.model';

// definindo contrato
export class PedidoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
   providedIn: 'root'
 })

export class PedidosService {
  pedidoUrl = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) { }

   pesquisar(filtro: PedidoFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders(); // .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }
    return this.http.get(`${this.pedidoUrl}?`, { headers, params })
      .toPromise()
      .then(response => {
        const pedidos = response['content']
        const resultado = { pedidos, total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pedidoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pedidoUrl)
      .toPromise()
      .then(response => response['content']);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pedidoUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(pedido: Pedidos): Promise<Pedidos> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Pedidos>(this.pedidoUrl, JSON.stringify(pedido), { headers })
      .toPromise()
      .then(response => response['content']);
  }

  atualizar(pedido: Pedidos): Promise<Pedidos> {
    return this.http.put(`${this.pedidoUrl}/${pedido.codigo}`,
        JSON.stringify(pedido))
      .toPromise()
      .then(response => response['content'] as Pedidos);
  }

  buscarPorCodigo(codigo: number): Promise<Pedidos> {
    return this.http.get(`${this.pedidoUrl}/${codigo}`)
      .toPromise()
      .then(response => response['content'] as Pedidos);
  }
}
