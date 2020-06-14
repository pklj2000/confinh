import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimentoService } from '../../services/movimento.service';
import { AplicacaoService } from '../../services/aplicacao.service';
import { BancoService } from '../../services/banco.service';
import { Estoque } from '../../model/estoque';
import { Movimento } from '../../model/movimento';
import { EventEmitterService } from '../../services/event-emitter.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { EstoqueService } from 'src/app/services/estoque.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movimento-list',
  templateUrl: './movimento-list.component.html',
  styleUrls: ['./movimento-list.component.css']
})
export class MovimentoListComponent implements OnInit {
  aplicacoes: any;
  bancos: any;
  displayedColumns: string[] = ['data', 'banco', 'codigoAplicacao', 'idTipoMovimento', 'quantidade', 'valorUn', 'valorTotal', 'options'];
  loading: boolean = true;
  bancoFiltro: string = "";
  aplicacaoFiltro: number = 0;
  showVoltar: boolean = false;
  idAplicacao: string;
  idBanco: string;
  dataIni: Date = new Date();
  dataFim: Date = new Date();
  tiposMovimentos: string;
  movimentosDataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movimentoService: MovimentoService,
    private aplicacaoService: AplicacaoService,
    private bancoService: BancoService,
    private estoqueService: EstoqueService,
    private eventemit: EventEmitterService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.dataIni.setDate( this.dataIni.getDate() - 30);
    this.route.queryParams.subscribe(params => {
      this.idAplicacao = params['idaplicacao'];
      this.idBanco = params['idbanco'];
      this.getMovimentos();
    });

    this.eventemit.setNotificacao("", "");
    this.movimentosDataSource.paginator = this.paginator;

    if (this.idAplicacao != null) {
      this.showVoltar = true;
    }

    this.bancoService.getAll().subscribe(data =>
      this.bancos = data
    )


    this.aplicacaoService.getAll().subscribe(data =>
      this.aplicacoes = data
    )

  }

  getMovimentos() {
    this.loading = true;
    if (this.idAplicacao == null) {
      this.filtrar();

    } else {
      let idbanco = !isNaN(+this.idBanco) ? +this.idBanco : 0;
      this.filtrar();
      this.movimentoService.getByParams(idbanco,+this.idAplicacao,"","","").subscribe(data => {
        this.movimentosDataSource.data = data;
      });

    }

  }

  delete(id: number) {
    this.movimentoService.getById(id).subscribe(data => {
      let idAplicacao = data.idAplicacao;
      let idBanco = data.idBanco;

      this.movimentoService.delete(id).subscribe(
        (response) => {
          this.getMovimentos();
          this.eventemit.setNotificacao("Movimento excluído", "sucesso");

          this.estoqueService.getByAplicacao(idAplicacao).subscribe(estoques => {
            let estoque: Estoque = estoques[0];
            estoque.quantidade = 0;
            estoque.valorMedio = 0;
            estoque.total = 0;
            this.movimentoService.getByParams(idBanco, idAplicacao, "", "","").subscribe(movimentos => {

              for (var i = 0, len = movimentos.length; i < len; i++) {
                if (movimentos[i].idTipoMovimento == "C") {
                  estoque.valorMedio = Math.round(((estoque.quantidade * estoque.valorMedio) + (movimentos[i].quantidade * movimentos[i].valorUn)) / (estoque.quantidade + movimentos[i].quantidade) * 100) / 100;
                  estoque.quantidade += movimentos[i].quantidade;
                  estoque.total = Math.round(estoque.valorMedio * estoque.quantidade * 100) / 100;
                } else {
                  estoque.quantidade -= movimentos[i].quantidade;
                  estoque.total = Math.round(estoque.valorMedio * estoque.quantidade * 100) / 100;
                }
              }
              this.estoqueService.update(estoque).subscribe(
                () => { },
                (error) => {
                  console.log(error.message);
                  this.eventemit.setNotificacao(error.message, "erro");
                  return;
                });
            })
          })

        },
        (error) => {
          console.log(error.message);
          this.eventemit.setNotificacao(error.message, "erro");
        }
      )
    }
    )
  }

  filtrar() {
    let dataini = this.datePipe.transform(this.dataIni, 'yyyy-MM-dd');
    let datafim = this.datePipe.transform(this.dataFim, 'yyyy-MM-dd');

    this.movimentoService.getByParams(+this.bancoFiltro, +this.aplicacaoFiltro, dataini, this.tiposMovimentos, datafim).subscribe(data =>
        this.movimentosDataSource.data = data
      )
  }

  compareItems(v1, v2) {
    return v1 && v2 && v1 === v2;
  }
}
