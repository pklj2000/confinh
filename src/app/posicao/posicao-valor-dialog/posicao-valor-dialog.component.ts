import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-posicao-valor-dialog',
  templateUrl: './posicao-valor-dialog.component.html',
  styleUrls: ['./posicao-valor-dialog.component.css']
})
export class PosicaoValorDialogComponent implements OnInit {

  valorPosicao: number;

  constructor(private dialogRef: MatDialogRef<PosicaoValorDialogComponent>) { }

  ngOnInit() {
  }
  submit() {
    if (this.valorPosicao == null) this.valorPosicao = 0;
    this.dialogRef.close(this.valorPosicao);
  }
}
