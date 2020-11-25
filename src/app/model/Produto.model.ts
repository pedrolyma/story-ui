import { Fornecedores } from './Fornecedor.model';
import { Localizacao } from './Localizacao.model';
import { Unidades } from './Unidade.model';
import { Grades } from './Grade.model';
import { Cores } from './Cores.model';
import { Marcas } from './Marca.model';
import { Modelos } from './Modelo.model';
import { Secoes } from './Secoes.model';

export class Produtos {
  codigo: number;
  descricao: string;
  referencia: string;
  codigoBarra: string;
  genero: string;
  statusProduto: true;
  ncmshProduto: string;
  secao = new Secoes();
  modelo = new Modelos();
  cores = new Cores();
  marcas = new Marcas();
  grades = new Grades();
  unidades = new Unidades();
  localizacao = new Localizacao();
  fornecedores = new Fornecedores();

  dataCadastro: Date;

  informacoes: string;
  fotoProduto1: string;
  fotoProduto2: string;
  fotoProduto3: string;

  saldoAtual: number;
  saldoMinimo: number;
  valorCusto: number;
  valorImposto: number;
  valorFrete: number;
  valorDesconto: number;
  margemGanho: number;
  vendaVista: number;
  vendaPrazo: number;
  vendaPromocao: number;
}
