import { Component, OnInit,ViewChild } from '@angular/core';
import { AplicacaoService } from '../../services/aplicacao.service';
import { Aplicacao } from '../../model/aplicacao';
import { EventEmitterService } from '../../services/event-emitter.service';
import { MatSortModule } from '@angular/material/sort'; 
import { MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-aplicacao-list',
  templateUrl: './aplicacao-list.component.html',
  styleUrls: ['./aplicacao-list.component.css']
})
export class AplicacaoListComponent implements OnInit {
  aplicacoes: Array<AplicacaoVM>;
  displayedColumns: string[] = ['tipo', 'codigo', 'nome', 'cnpj', 'setor', 'ativo', 'ordem', 'options'];
  loading: boolean = true;
  dataSource: MatTableDataSource<AplicacaoVM>;
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(private aplicacaoService: AplicacaoService, private eventemit: EventEmitterService) {
    this.getAplicacoes();    
  }
  
  ngOnInit() {
    this.eventemit.setNotificacao("", "");
    

  }
  
  getAplicacoes() {
    let aplicacao: Aplicacao;
    this.loading = true;
    this.aplicacoes = [];
    this.aplicacaoService.getAll().subscribe((data) => {
      this.loading = false;

      for (let app of data) {
        let item = new AplicacaoVM();
        item.id = app.id;
        item.tipo = app.tipo.nome;
        item.codigo = app.codigo;
        item.cnpj = app.cnpj;
        item.nome = app.nome;
        item.setor = app.setor.nome;
        item.ativo = app.ativo;
        item.ordem = app.ordem;
        this.aplicacoes.push(item);
      }
      this.dataSource = new MatTableDataSource(this.aplicacoes);
      this.dataSource.sort = this.sort;
    });
  }

  delete(id: number){
    this.aplicacaoService.delete(id).subscribe(
      (response) => {this.getAplicacoes();},
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    )
  }
}

export class AplicacaoVM {
  id: number;
  tipo: string;
  codigo: string;
  nome: string;
  cnpj: string;
  setor: string;
  ativo: string;
  ordem: string;
}

