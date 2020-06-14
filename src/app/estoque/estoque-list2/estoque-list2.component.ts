import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/services/estoque.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-estoque-list2',
  templateUrl: './estoque-list2.component.html',
  styleUrls: ['./estoque-list2.component.css']
})
export class EstoqueList2Component implements OnInit {

  constructor(private estoqueService: EstoqueService,
    public datepipe: DatePipe) { }

  dataCorte: Date = new Date();
  estoques: any;
  detailVisible: Array<boolean> = [];

  ngOnInit() {
  }

  ObterEstoqueEstoqueSetor(){
    let data = this.datepipe.transform(this.dataCorte, 'yyyy-MM-dd');
    this.estoqueService.getCalculadoSetor(data).subscribe(data => {
      this.estoques = data;
      this.detailVisible = [];
      for (let i in data) {
        this.detailVisible.push(false);
      }
    })
  }
}


