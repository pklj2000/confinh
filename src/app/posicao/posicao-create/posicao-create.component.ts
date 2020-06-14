import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material';
import { AplicacaoService } from 'src/app/services/aplicacao.service';
import { PosicaoService } from '../../services/posicao.service';
import { BancoService } from '../../services/banco.service';
import { EstoqueService } from '../../services/estoque.service';
import { MatTable } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PosicaoValorDialogComponent } from '../posicao-valor-dialog/posicao-valor-dialog.component';
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';
import { Posicao } from 'src/app/model/posicao';
import { Banco } from 'src/app/model/banco';
import { EventEmitterService } from '../../services/event-emitter.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { Movimento } from 'src/app/model/movimento';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posicao-create',
  templateUrl: './posicao-create.component.html',
  styleUrls: ['./posicao-create.component.css']
})
export class PosicaoCreateComponent implements OnInit {

  displayedColumns: string[] = ['codigoAplicacao', 'nomeBanco', 'total', 'options'];
  @ViewChild(MatTable) table: MatTable<any>;
  valor: number;
  posicao: number;
  dataPosicao: Date = new Date();
  valorPosicaoDialogRef: MatDialogRef<PosicaoValorDialogComponent>;
  bancos: any;
  bancosFiltro: Observable<any[]>;
  aplicacoes: any;
  aplicacoesFiltro: Observable<any[]>;
  id: string = "";
  dataPosicaoRef: string;

  posicaoAplicacao = {
    dataPosicao: "",
    aplicacoes: Array<any>()
  }

  posicaoForm = new FormGroup({
    data: new FormControl('', Validators.required),
    banco: new FormControl('', Validators.required),
    aplicacao: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required)
  });

  constructor(private dateAdapter: DateAdapter<Date>,
    private bancoService: BancoService,
    private aplicacaoService: AplicacaoService,
    private posicaoService: PosicaoService,
    private estoqueService: EstoqueService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private eventemit: EventEmitterService,
    private datePipe: DatePipe) {
    this.dateAdapter.setLocale('pt-BR');

    if(this.route.snapshot.params['id']){
    this.id = this.route.snapshot.params['id'];
    this.dataPosicaoRef = this.id.substr(6,2) + "/"  + this.id.substr(4,2) + "/" + this.id.substr(0,4);
    }
  }

  ngOnInit() {
    if (this.id != ""){
      this.CarregarGrid();
    }
    this.bancoService.getAll().subscribe(rows=> {
      this.bancos = rows;

      this.bancosFiltro = this.posicaoForm.controls['banco'].valueChanges.pipe(
        startWith(''),
        map(value => this.filtrarBancos(value))
      )
    });
    this.aplicacaoService.getByParams('1','','').subscribe(rows=>{
      this.aplicacoes = rows;
      this.aplicacoesFiltro = this.posicaoForm.controls['aplicacao'].valueChanges.pipe(
        startWith(''),
        map(value=> this.filtrarAplicacoes(value))
      )
    })

  }

  CarregarGrid(){
    this.posicaoService.getByData(this.id).subscribe(pos => {
        
      this.posicaoAplicacao.aplicacoes = pos;
      this.table.renderRows();
    })
  }

  private filtrarBancos(value: string): string[] {
    const filterValue = value.toString().toLowerCase();  
    return this.bancos.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  private filtrarAplicacoes(value: string): string[] {
    const filterValue = value.toString().toLowerCase();  
    return this.aplicacoes.filter(option => option.codigo.toLowerCase().indexOf(filterValue) === 0);
  }

  autocompleteBanco(bancoItem) {
    return bancoItem.nome;
  }

  autocompleteAplicacao(aplicacaoItem) {
    return aplicacaoItem.codigo;
  }

  addPosicao(){
    let posicao: Posicao = new Posicao();
    posicao.data = this.posicaoForm.controls["data"].value;
    posicao.idbanco = this.posicaoForm.controls["banco"].value.id;
    posicao.idaplicacao= this.posicaoForm.controls["aplicacao"].value.id;
    posicao.total = this.posicaoForm.controls["valor"].value;

    let bancoSel = this.bancos.filter(ban=> ban.id == posicao.idbanco);
  
    console.log(bancoSel.nome);
    let aplicacaoSel = this.aplicacoes.filter(function(apl) {
      return apl.id == posicao.idaplicacao;
    });

    
    let posicao1 ={"id":0,"idBanco":58,"idAplicacao":47,"quantidade":10,"total":1329,"valorMedio":132.9,"aplicacao":null,"nomeBanco":bancoSel.nome,"tipo":null};


    this.posicaoAplicacao.aplicacoes.push(posicao1);
    this.table.renderRows();
    console.log(posicao1);
  }

  addMovimentos(){
    let dataPesquisa = this.posicaoForm.controls["data"].value;
    let data = this.datePipe.transform(dataPesquisa, 'yyyy-MM-dd');
    if(dataPesquisa != ""){
      this.estoqueService.getCalculadoBanco(data).subscribe(data=>{
        let estoque = data;
        estoque.forEach(element => {
          var selectedItem = this.posicaoAplicacao.aplicacoes.filter(function(pos) {
            return pos.idBanco == element.idBanco && pos.idAplicacao == element.idAplicacao;
          });
          if(selectedItem.length > 0){
            selectedItem[0].total = element.total;
          }
          console.log(selectedItem.length);
        });
        this.table.renderRows();
      });
     
    } else {
      alert("Data inválida");
    }
  }

  openDialog(index: number): void {
    this.posicao = index;
    
    this.valorPosicaoDialogRef = this.dialog.open(PosicaoValorDialogComponent, {
      width: '250px'
    });

    this.valorPosicaoDialogRef
        .afterClosed()
        .subscribe(valor => {
          this.valor = valor;
          this.posicaoAplicacao.aplicacoes[this.posicao].total = valor;


        });
  }

}