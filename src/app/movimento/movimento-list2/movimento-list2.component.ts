import { Component, OnInit } from '@angular/core';
import { MovimentoService } from '../../services/movimento.service';
import { Aplicacao } from '../../model/aplicacao';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-movimento-list2',
  templateUrl: './movimento-list2.component.html',
  styleUrls: ['./movimento-list2.component.css']
})
export class MovimentoList2Component implements OnInit {
  movimentos: any;

  constructor(private movimentoService: MovimentoService, private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.eventemit.setNotificacao("", "");
    this.getAplicacoes();
  }

  getAplicacoes() {
    let aplicacao: Aplicacao;
    this.movimentos = [];
    this.movimentoService.getAll().subscribe((data: {}) => {
      this.movimentos = data;
    });
  }
}
