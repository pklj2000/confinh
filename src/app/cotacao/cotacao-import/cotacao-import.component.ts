import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Movimento } from 'src/app/model/movimento';
import { AplicacaoService } from 'src/app/services/aplicacao.service';
import { MovimentoService } from 'src/app/services/movimento.service';
import { CotacaoService } from 'src/app/services/cotacao.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { forkJoin } from 'rxjs';
import { Cotacao } from 'src/app/model/cotacao';

@Component({
  selector: 'app-cotacao-import',
  templateUrl: './cotacao-import.component.html',
  styleUrls: ['./cotacao-import.component.css']
})
export class CotacaoImportComponent implements OnInit {

  private _movimento: string[];
  private result: string[] = [];
  private selectedData: string = '';

  CotacaoImportForm = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  constructor(private cotacaoService: CotacaoService,
    private movimentoService: MovimentoService,
    private eventemit: EventEmitterService) { }

  ngOnInit() {

  }



  ImportarCotacoes(itemMovimento: Movimento, aplicacaoDescricao: string, linha:number) {
    var content: string = this.CotacaoImportForm.get("content").value;
    var linhasCotacao = JSON.parse(content);
    let cotacao: Cotacao;

    for(let cotacaoItem of linhasCotacao){
      cotacao = new Cotacao();
      cotacao.Id = 0;
      cotacao.Data = cotacaoItem.data;
      cotacao.IdAplicacao = +cotacaoItem.idaplicacao;
      cotacao.Valor = +cotacaoItem.valor;
      
      this.cotacaoService.insert(cotacao).subscribe(
        () => {
        },
        (error) => {
           console.log(error.message);
           this.eventemit.setNotificacao(error.message, "erro");
           return;
        });;
    }
  }
  

  ExcluirCotacoes(){
    this.cotacaoService.delete(this.selectedData).subscribe(
      () => {
        this.eventemit.setNotificacao("Movimentos excluidos", "sucesso");
      },
      (error) => {
        console.log("erro");
      }
    );
  }

}
