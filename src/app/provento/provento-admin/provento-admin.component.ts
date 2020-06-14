import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ProventoService } from 'src/app/services/provento.service';
import { MovimentoService } from 'src/app/services/movimento.service';
import { Movimento } from 'src/app/model/movimento';


@Component({
  selector: 'app-provento-admin',
  templateUrl: './provento-admin.component.html',
  styleUrls: ['./provento-admin.component.css']
})

export class ProventoAdminComponent implements OnInit {
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
    private proventoService: ProventoService,
    private movimentoService: MovimentoService) { }

  ngOnInit() {
  }

  RecalcularMovimento(){
    this.proventoService.getAll().subscribe(dataPro=> {
      
      for (let index = 0; index < dataPro.length; index++) {
        this.movimentoService.getByParams(dataPro[index].idBanco, dataPro[index].idAplicacao, 
          dataPro[index].dataCom, dataPro[index].idTipoParamento, "").subscribe(dataMov => {
          if(dataMov.length == 0){
            var movimento: Movimento = new Movimento();
            movimento.idaplicacao = dataPro[index].idAplicacao;
            movimento.idbanco
            console.log(dataPro[index].idAplicacao);
          }
        });
      }
    });
  }
}
