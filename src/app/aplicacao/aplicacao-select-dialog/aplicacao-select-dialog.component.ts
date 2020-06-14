import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BancoService } from 'src/app/services/banco.service';
import { AplicacaoService } from 'src/app/services/aplicacao.service';
import { PosicaoService } from 'src/app/services/posicao.service';

@Component({
  selector: 'app-aplicacao-select-dialog',
  templateUrl: './aplicacao-select-dialog.component.html',
  styleUrls: ['./aplicacao-select-dialog.component.css']
})
export class AplicacaoSelectDialogComponent implements OnInit {

  idBanco: number;
  idAplicacao: number;
  bancos: any;
  bancoFiltro: number;
  aplicacoes: any;
  aplicacaoFiltro: number;

  constructor(private dialogRef: MatDialogRef<AplicacaoSelectDialogComponent>,
    private bancoService: BancoService,
    private aplicacaoService: AplicacaoService,
    private posicaoService: PosicaoService) { }

  ngOnInit() {
    this.getMovimentos();
  }

  getMovimentos() {
    this.bancoService.getAll().subscribe(data => {
      this.bancos = data;
    });

    this.aplicacaoService.getByParams("1", "", "").subscribe(data => {
      this.aplicacoes = data;
    })

  }

  fechar() {
    this.dialogRef.close(0);
  }

  adicionarAplicacao() {
    if (this.aplicacaoFiltro != null && this.aplicacaoFiltro > 0) {
      this.dialogRef.close(this.aplicacaoFiltro);
    }
  }

}
