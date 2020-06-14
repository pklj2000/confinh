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
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ProventoService } from 'src/app/services/provento.service';

@Component({
  selector: 'app-provento-import',
  templateUrl: './provento-import.component.html',
  styleUrls: ['./provento-import.component.css']
})
export class ProventoImportComponent implements OnInit {


  private index: number = 0;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'text/plain',      
      'Accept':  'text/plain',
      'Access-Control-Allow-Origin': '*'
    })
  }

  private ProventoImportForm = new FormGroup({
    content: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient,
    private proventoService: ProventoService) { }

  ngOnInit() {
  }

  ImportarProventos(){
    this.proventoService.getAll().subscribe(data=> {
      this.index ++;
          });
  }
  
}