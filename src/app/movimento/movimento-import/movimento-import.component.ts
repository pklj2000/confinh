import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Movimento } from 'src/app/model/movimento';
import { AplicacaoService } from 'src/app/services/aplicacao.service';
import { MovimentoService } from 'src/app/services/movimento.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { forkJoin } from 'rxjs';
import { Banco } from 'src/app/model/banco';
import { Aplicacao } from 'src/app/model/aplicacao';

@Component({
  selector: 'app-movimento-import',
  templateUrl: './movimento-import.component.html',
  styleUrls: ['./movimento-import.component.css']
})
export class MovimentoImportComponent implements OnInit {

  private _movimento: string[];
  private result: string[] = [];
  private resultMessage: String;
  MovimentoImportForm = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  constructor(private aplicacaoService: AplicacaoService,
    private movimentoService: MovimentoService,
    private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.eventemit.setNotificacao("", "");
  }

  ImportarMovimentos() {
    var linhasMovimento: string[];
    var movimento: Movimento;
    var insertOK: number = 0;
    var insertErro: number = 0;
    var erroLinha:string = "";
    var _content: string = this.MovimentoImportForm.get("content").value;
    linhasMovimento = _content.split("\n");

    for (let index = 0; index < linhasMovimento.length; index++) {
      let itemMovimento = linhasMovimento[index];
      this._movimento = itemMovimento.split(";");

      if (this._movimento.length >= 7) {
        movimento = new Movimento();
        movimento.data = new Date(this._movimento[0]);
        movimento.idtipomovimento = this._movimento[1];
        movimento.idaplicacao = 0;
        movimento.banco = new Banco();
        movimento.banco.nome = this._movimento[2];
        movimento.aplicacao = new Aplicacao();
        movimento.aplicacao.codigo = this._movimento[3];
        movimento.quantidade = +this._movimento[4];
        movimento.valorun = +this._movimento[5].replace(",", ".");
        movimento.valorTotal = +this._movimento[6].replace(",", ".");
        this.InserirMovimento(movimento, index);
      } else{
        this.setMessage("Erro linha " + index + ": Deve ter 7 campos", "erro");
      }
    }

    console.log(this.result);
    erroLinha = this.result.join("<br>");

  }

  InserirMovimento(itemMovimento: Movimento, linha:number) {
    
        this.movimentoService.insertByDescricao(itemMovimento).subscribe(
          () => {
            console.log("insert");
            this.result.push(linha + " :OK");
            this.AtualizarStatus(linha, "OK");
          },
          (error) => {
            console.log("erro");
            this.result.push(linha + " :" + error.message);
            this.AtualizarStatus(linha, "ERRO: " + error.message);
          }
        );
  }
  
  AtualizarStatus(linha: number, texto: string){
    var content: string = this.MovimentoImportForm.get("content").value;
    var linhasMovimento: string[] = content.split("\n");

    linhasMovimento[linha] = linhasMovimento[linha] + " " + texto;
    var result: string = linhasMovimento.join("\n");
    this.MovimentoImportForm.get("content").setValue(result);
  }

  ExcluirMovimentos(){
    this.movimentoService.deleteAll().subscribe(
      () => {
        this.eventemit.setNotificacao("Movimentos excluidos", "sucesso");
      },
      (error) => {
        console.log("erro");
      }
    );
  }

  setMessage(mensagem, tipo){
    this.eventemit.setNotificacao(mensagem, tipo);
  }

}
