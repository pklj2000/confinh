import { Component, OnInit } from '@angular/core';
import { Estoque } from '../../model/estoque';
import { EstoqueService } from '../../services/estoque.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estoque-list',
  templateUrl: './estoque-list.component.html',
  styleUrls: ['./estoque-list.component.css']
})
export class EstoqueListComponent implements OnInit {
  estoques: any;
  aplicacoes: any;
  bancos: any;
  displayedColumns: string[] = ['banco', 'codigoAplicacao','tipo',  'quantidade', 'valorMedio', 'total', 'options'];
  loading: boolean = true;
  bancoFiltro: string = "";
  aplicacaoFiltro: string= "";
  showVoltar: boolean = false;
  valorTotal: number = 0;
  estoquesDataSource = new MatTableDataSource();

  constructor(private estoqueService: EstoqueService,
    private eventemit: EventEmitterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.estoqueService.getAll().subscribe(data=>{
      this.estoquesDataSource  =new MatTableDataSource<Estoque>(data);
      this.estoquesDataSource.filterPredicate = this.customFilter();


      for (var i = 0; i< data.length; i++){
        this.valorTotal += +data[i].total;
      }
      this.valorTotal = Math.round(this.valorTotal*100)/100;
    
  });
  }

  viewDetail(idAplicacao: number){
    this.router.navigate(['/movimento'], { queryParams: { idaplicacao: idAplicacao } });
  }

  public filtrarEstoque = (value: string) => {
    var _value = value.trim().toLowerCase();
    this.estoquesDataSource.filter = _value;
    this.valorTotal = 0;

    
    for(var i = 0; i< this.estoquesDataSource.filteredData.length; i++){
      this.valorTotal+= (this.estoquesDataSource.filteredData[i]['total']);
    }
  }

  public  customFilter(){
    
    let filterFunction = function(data, filter) : boolean {
      return data.banco.nome.toLowerCase().indexOf(filter) != -1 ||
        data.aplicacao.codigo.toLowerCase().indexOf(filter) != -1 ||
        data.tipo.nome.toLowerCase().indexOf(filter) != -1;
    }

    return filterFunction
}

}
