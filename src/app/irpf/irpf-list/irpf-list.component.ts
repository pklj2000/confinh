import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from '../../services/event-emitter.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EstoqueService } from '../../services/estoque.service';
import { MovimentoService } from 'src/app/services/movimento.service';
import { Estoque } from 'src/app/model/estoque';
import { AplicacaoService } from 'src/app/services/aplicacao.service';
import { Aplicacao } from 'src/app/model/aplicacao';
import { CotacaoService } from 'src/app/services/cotacao.service';
import { IrpfView } from 'src/app/viewModel/irpf-view';
import { IrpfVendaView } from 'src/app/viewModel/irpf-venda-view';
import { MovimentoProventoAcumComponent } from 'src/app/movimento/movimento-provento-acum/movimento-provento-acum.component';

@Component({
  selector: 'app-irpf-list',
  templateUrl: './irpf-list.component.html',
  styleUrls: ['./irpf-list.component.css']
})
export class IrpfListComponent implements OnInit {
  estoques: Array<IrpfView>;
  vendas: Array<IrpfVendaView>;
  estoque: IrpfView;
  venda: IrpfVendaView;
  aplicacoes: any;
  dataInicio: Date;
  dataCorte: Date = new Date();
  totalGeral: number;
  dataCotacao: string;
  totalGetalCotacao: number = 0;
  totalSaldo: number = 0;

  @ViewChild(MovimentoProventoAcumComponent)
  private gridMovimentoProventoAc: MovimentoProventoAcumComponent;

  constructor(private estoqueService: EstoqueService,
    private movimentoService: MovimentoService,
    private aplicacaoService: AplicacaoService,
    private cotacaoService: CotacaoService,
    private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.aplicacaoService.getAll().subscribe(data => {
      this.aplicacoes = data;
    });
  }

  RecalcularEstoque() {
    this.totalSaldo = 0;
    this.totalGeral = 0;
    this.totalGetalCotacao = 0;

    this.estoques = new Array<IrpfView>();
    this.vendas = new Array<IrpfVendaView>()

    this.cotacaoService.getCotacaoCorrente().subscribe(cotcorrente => {
      let cotacoesCorrentes = cotcorrente;

      this.movimentoService.getAll().subscribe(data => {
        for (var i = 0, len = data.length; i < len; i++) {

          if (this.dataCorte > new Date(data[i].data) && data[i].idprovento == null) {

            const result = this.estoques.filter(p => p.idAplicacao == data[i].idAplicacao);
            if (result.length == 0) {
              this.estoque = new IrpfView();
              this.estoque.idAplicacao = data[i].idAplicacao;
              this.estoque.quantidade = 0;
              this.estoque.valorMedio = 0;

              const aplicacaoItem = this.aplicacoes.filter(app => app.id == data[i].idAplicacao);

              if (aplicacaoItem.length > 0) {
                this.estoque.nomeAplicacao = aplicacaoItem[0].codigo;
              } else {
                this.estoque.nomeAplicacao = "NA";
              }

              if (data[i].idTipoMovimento == "C") {
                this.estoque.quantidade = data[i].quantidade;
                this.estoque.valorMedio = data[i].valorUn;
                this.estoque.total = Math.round(this.estoque.quantidade * this.estoque.valorMedio * 100) / 100;
              } 
              if (data[i].idTipoMovimento == "V") {
                this.estoque.quantidade -= data[i].quantidade;
                this.estoque.total = Math.round(this.estoque.quantidade * this.estoque.valorMedio * 100) / 100;
              }
              this.estoques.push(this.estoque);

            } else {
              if (data[i].idTipoMovimento == "C") {
                result[0].valorMedio = Math.round((((result[0].quantidade * result[0].valorMedio) + (data[i].quantidade * data[i].valorUn)) / (result[0].quantidade + data[i].quantidade)) * 100) / 100;
                result[0].quantidade += data[i].quantidade;
                result[0].total = Math.round(result[0].valorMedio * result[0].quantidade * 100) / 100;
              }
              if (data[i].idTipoMovimento == "V") {
                result[0].quantidade -= data[i].quantidade;
                result[0].total = Math.round(result[0].valorMedio * result[0].quantidade * 100) / 100;
              }
            }

            //Calculo dos valores já realizados
            if (data[i].idTipoMovimento == "V") {
              if(this.VerificaData(new Date(data[i].data), this.dataInicio, this.dataCorte))
              {

              const result1 = this.vendas.filter(p => p.idAplicacao == data[i].idAplicacao);
              if (result1.length == 0) {
                this.venda = new IrpfVendaView();
                this.venda.idAplicacao = data[i].idAplicacao;
                this.venda.quantidade = data[i].quantidade;
                this.venda.total = data[i].quantidade * data[i].valorUn - data[i].quantidade * result[0].valorMedio;
                if(data[i].idAplicacao == 59) {
                  console.log(data[i].quantidade + "*" + data[i].valorUn + "-" + data[i].quantidade + "*" +  result[0].valorMedio);
                }

                const aplicacaoItem = this.aplicacoes.filter(app => app.id == data[i].idAplicacao);

                if (aplicacaoItem.length > 0) {
                  this.venda.nomeAplicacao = aplicacaoItem[0].codigo;
                  this.venda.cnpj = aplicacaoItem[0].cnpj;
                } else {
                  this.venda.nomeAplicacao = "NA";
                }


                  
                this.vendas.push(this.venda);
              } else {
                result1[0].quantidade += data[i].quantidade;
                if (result.length > 0) {
                  result1[0].total += data[i].quantidade * data[i].valorUn - data[i].quantidade * result[0].valorMedio;
                }
 
              }
            }
            }
          }
        };

        for (let papel of this.estoques) {
          const cotacaoItem = cotacoesCorrentes.filter(p => p.idAplicacao == papel.idAplicacao);

          if (cotacaoItem.length == 1) {
            papel.valorCotacao = cotacaoItem[0].valor;
            papel.valorTotalCotacao = papel.valorCotacao * papel.quantidade;
            papel.saldo = papel.valorTotalCotacao - papel.total;
            papel.percentualGanho = papel.saldo / papel.total * 100;
            this.totalGetalCotacao += papel.valorTotalCotacao;
            this.totalSaldo += papel.saldo;
          }

        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue.total;
        this.totalGeral = this.estoques.reduce(reducer, 0);
        let itemTotal: IrpfView = new IrpfView();
        itemTotal.total = this.totalGeral;
        itemTotal.valorTotalCotacao = this.totalGetalCotacao;
        itemTotal.saldo = this.totalSaldo;
        itemTotal.percentualGanho = itemTotal.saldo / itemTotal.total * 100;
        itemTotal.nomeAplicacao = "Total"


        this.estoques.sort((a, b) => a.total - b.total);
        this.estoques.push(itemTotal);

        let vendaTotal: IrpfVendaView = new IrpfVendaView();
        vendaTotal.nomeAplicacao = "TOTAL";
        vendaTotal.quantidade = 0;
        vendaTotal.total = 0;
        for(let vendaItem of this.vendas) {
          vendaTotal.quantidade += vendaItem.quantidade;
          vendaTotal.total += vendaItem.total;
        }
        this.vendas.push(vendaTotal);


        this.gridMovimentoProventoAc.Executar(this.dataInicio, this.dataCorte);
      },
        (error) => {
          console.log(error.message);
          this.eventemit.setNotificacao(error.message, "erro");
        })

    })

    this.cotacaoService.getDataCorrente().subscribe(data => {
      this.dataCotacao = data;
    });

  }

  VerificaData(dataref: Date, dataini: Date, datafim: Date){
    let result = false;
    result = dataref <= datafim;
    result = (result && !dataini) || (result && dataref >= dataini);
    return result;
  }

}
