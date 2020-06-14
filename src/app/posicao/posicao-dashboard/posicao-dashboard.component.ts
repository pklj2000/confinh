import { Component, OnInit } from '@angular/core';
import { PosicaoService } from 'src/app/services/posicao.service';

@Component({
  selector: 'app-posicao-dashboard',
  templateUrl: './posicao-dashboard.component.html',
  styleUrls: ['./posicao-dashboard.component.css']
})
export class PosicaoDashboardComponent implements OnInit {

  datas: any;
  dataFiltro: string;
  valorTotal: number = 815219.52;
  posicaoBanco: any;
  posicaoTipo: any;
  constructor(private posicaoService: PosicaoService) { }

  ngOnInit() {
    this.CarregarDatas();
  }

  CarregarDatas(){
    this.posicaoService.getDatas().subscribe(data => {
      this.datas = data;
    });
  }

  data_onChange(){
    this.posicaoService.getAc(1,this.dataFiltro).subscribe(valor => {
      
      this.valorTotal = valor.valor;
    });

    this.posicaoService.getAc(2,this.dataFiltro).subscribe(bancos => {
      this.posicaoBanco = bancos;
    })
    
    this.posicaoService.getAc(3,this.dataFiltro).subscribe(tipos => {
      console.log(tipos);
      this.posicaoTipo = tipos;
    })
  }

}
