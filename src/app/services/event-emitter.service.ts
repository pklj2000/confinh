import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeNotificacaoComponentFunction = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  setNotificacao(value, tipo) {    
    this.invokeNotificacaoComponentFunction.emit({"message" : value, "tipo":tipo});    
  }    
}
