import { Component, OnInit } from '@angular/core';
import { PosicaoService } from '../../services/posicao.service';
import { Posicao } from '../../model/posicao';
import { EventEmitterService } from '../../services/event-emitter.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDeleteComponent } from 'src/app/dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-posicao-list',
  templateUrl: './posicao-list.component.html',
  styleUrls: ['./posicao-list.component.css']
})
export class PosicaoListComponent implements OnInit {
  posicaoDataSource = new MatTableDataSource();
  displayedColumns: string[] = ['nomeBanco', 'nomeAplicacao', 'total'];
  datas: Observable<any>;
  dataFiltro: string;
  hasData: boolean = false;
  confirmaDialogRef: MatDialogRef<ConfirmDeleteComponent>;

  constructor(private posicaoService: PosicaoService,
    public dialog: MatDialog,
    private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.CarregarDatas();
  }

  CarregarDatas(){
    this.posicaoService.getDatas().subscribe(data => {
      this.datas = data;
    });
  }

  data_onChange() {
    this.posicaoService.getByData(this.dataFiltro).subscribe(data => {
      this.hasData = true;
      this.posicaoDataSource = new MatTableDataSource<Posicao>(data);
    })
  }

  /*customFilter() {
    let filterFunction = function (data, filter): boolean {
      return data.banco.nome.toLowerCase().indexOf(filter) != -1 ||
        data.aplicacao.codigo.toLowerCase().indexOf(filter) != -1 ||
        data.tipo.nome.toLowerCase().indexOf(filter) != -1;
    }
  }*/

  openDialog(): void {

    this.confirmaDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px'
    });

    this.confirmaDialogRef
      .afterClosed()
      .subscribe(valor => {
        console.log('close dialog');
        console.log(this.dataFiltro);
        if(valor){
        this.posicaoService.deleteByData(this.dataFiltro).subscribe(
          () => {
            this.eventemit.setNotificacao("Posição excluída", "sucesso");
            this.CarregarDatas();
          },
        (error) => {
          console.log(error.message);
          this.eventemit.setNotificacao(error.message, "erro");
          return;
        });
      }
      });
  }
}
