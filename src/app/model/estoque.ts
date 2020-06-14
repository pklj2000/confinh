import { Banco } from './banco';
import { Aplicacao } from './aplicacao';
import { Tipo } from './tipo';

export class Estoque {
    id: number;
    idAplicacao: number;
    idbanco: number;
    quantidade: number = 0;
    valorMedio: number = 0;
    total: number = 0;
    
    banco: Banco;
    aplicacao: Aplicacao;
    tipo: Tipo;
}
