import { Component, OnInit } from '@angular/core';
import { AplicacaoService } from '../../services/aplicacao.service';
import { Aplicacao } from '../../model/aplicacao';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-aplicacao-list2',
  templateUrl: './aplicacao-list2.component.html',
  styleUrls: ['./aplicacao-list2.component.css']
})
export class AplicacaoList2Component implements OnInit {
  aplicacoes: any;

  constructor(private aplicacaoService: AplicacaoService, private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.eventemit.setNotificacao("", "");
    this.getAplicacoes();
  }

  getAplicacoes() {
    let aplicacao: Aplicacao;
    this.aplicacoes = [];
    this.aplicacaoService.getByParams("2", "", "tip.nome").subscribe((data: {}) => {
      this.aplicacoes = data;
    });
  }
}
