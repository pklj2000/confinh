import { Component, OnInit, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { AplicacaoService } from 'src/app/services/aplicacao.service';
import { PosicaoService } from '../../services/posicao.service';
import { MatTable } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PosicaoValorDialogComponent } from '../posicao-valor-dialog/posicao-valor-dialog.component';
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Posicao } from 'src/app/model/posicao';
import { EventEmitterService } from '../../services/event-emitter.service';
import { AplicacaoSelectDialogComponent } from 'src/app/aplicacao/aplicacao-select-dialog/aplicacao-select-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-posicao-edit',
  templateUrl: './posicao-edit.component.html',
  styleUrls: ['./posicao-edit.component.css']
})
export class PosicaoEditComponent implements OnInit {

  displayedColumns: string[] = ['codigoAplicacao', 'banco', 'total', 'options'];
  @ViewChild(MatTable) table: MatTable<any>;
  valor: number;
  dataPosicao: string;
  valorPosicaoDialogRef: MatDialogRef<PosicaoValorDialogComponent>;
  aplicacaoSelectDialogRef: MatDialogRef<AplicacaoSelectDialogComponent>;
  id: string;
  posicao: number;
  aplicacaoToAdd: number;

  posicaoData = {
    dataPosicao: "",
    aplicacoes: Array<any>(),
    changed: []
    }

  constructor(private dateAdapter: DateAdapter<Date>,
    private aplicacaoService: AplicacaoService,
    private posicaoService: PosicaoService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private eventemit: EventEmitterService) {
    this.dateAdapter.setLocale('pt-BR');
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.dataPosicao = this.id.substr(6,2) + "/"  + this.id.substr(4,2) + "/" + this.id.substr(0,4);
    this.CarregarGrid();
  }

  CarregarGrid(){
    this.posicaoService.getByData(this.id).subscribe(pos => {
        
      this.posicaoData.aplicacoes = pos;
      this.table.renderRows();
    })
  }

  openDialog(index: number): void {
    this.posicao = index;
    
    this.valorPosicaoDialogRef = this.dialog.open(PosicaoValorDialogComponent, {
      width: '250px'
    });

    this.valorPosicaoDialogRef
        .afterClosed()
        .subscribe(valor => {
          this.valor = valor;
          this.posicaoData.aplicacoes[this.posicao].total = valor;

          if (this.posicaoData.changed.indexOf(this.posicao) < 0) {
            this.posicaoData.changed.push(this.posicao);
          }
        });
  }


  submit(){
    this.posicaoData.dataPosicao = this.dataPosicao;//formatDate(this.dataPosicao, 'dd/MM/yyyy', 'pt-BR');    

    for(let i = 0; i< this.posicaoData.changed.length; i++){
      console.log(this.posicaoData.aplicacoes[this.posicaoData.changed[i]]);
      this.posicaoService.update(this.posicaoData.aplicacoes[this.posicaoData.changed[i]]).subscribe(
        () => {},
        (error) => {
          console.log(error.message);
          this.eventemit.setNotificacao(error.message, "erro");
          return;
        });
    }

    this.router.navigate(['/posicao']);
  }

  addAplicacao(){
    this.aplicacaoSelectDialogRef = this.dialog.open(AplicacaoSelectDialogComponent, {
      width: '550px'
    });

    this.aplicacaoSelectDialogRef
    .afterClosed()
    .subscribe(valor => {
      this.aplicacaoToAdd = valor;
      console.log(valor);

      if(valor >  0){
      let _posicao: Posicao = new  Posicao();
      _posicao.idaplicacao = valor;
      _posicao.data =  moment(this.dataPosicao, "DD/MM/YYYY").toDate();
      _posicao.total = 0;

      this.posicaoService.insert(_posicao).subscribe(() => {
      this.CarregarGrid();
      },
      (error) => {
         console.log(error);
         this.eventemit.setNotificacao(error.error, "erro");
         return;
      });
    }
    })
  }
  
}
