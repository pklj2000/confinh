import { Banco } from './banco';
import { Aplicacao } from './aplicacao';

export class Movimento {
    id: number;
    idbanco: number;
    idaplicacao: number;
    idtipomovimento: string;
    data: Date;
    quantidade: number;
    valorun: number;
    valorTotal: number;

    banco: Banco;
    aplicacao: Aplicacao;
}
