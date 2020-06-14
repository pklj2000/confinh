import { Component, OnInit } from '@angular/core';
import {EventEmitterService} from '../services/event-emitter.service';

@Component({
  selector: 'app-notificacao',
  template: `
    <div [ngClass]="tipo" *ngIf="mensagem!=''">
      <span>{{mensagem}}</span>
    </div>'`
})
export class NotificacaoComponent implements OnInit {

  constructor( private eventEmitterService: EventEmitterService ) { }
  mensagem: string = "";
  tipo: string = "normal";
  exibir: boolean = true;


  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeNotificacaoComponentFunction.subscribe((value:any) => {    
        this.setMensagem(value.message,value.tipo);    
      });    
    }    
  }

  setMensagem(mensagem: string, tipo: string){
    this.mensagem = mensagem;
    this.exibir = true;

    switch(tipo.toLowerCase()){
      case 'normal':
          this.tipo = 'alert alert-default';
          break;
      case 'erro':
          this.tipo = 'alert alert-danger';
          break;
      case 'alerta':
          this.tipo = 'alert alert-warning';
           break;
      case 'sucesso':
          this.tipo = 'alert alert-success';
           break;
      default:
          this.exibir = false;
          break;
    }
  }
}
