import { Component, OnInit, Input } from '@angular/core';
import { MovimentoService } from 'src/app/services/movimento.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-movimento-provento-acum',
  templateUrl: './movimento-provento-acum.component.html',
  styleUrls: ['./movimento-provento-acum.component.css']
})
export class MovimentoProventoAcumComponent implements OnInit {
  dataini: string;
  datafim: string;
  proventos: any;
  
  constructor(private movimentoService: MovimentoService,
    public datepipe: DatePipe) { }

  ngOnInit() {
  }

  Executar(dataini: Date, datafim: Date){
    this.dataini = this.datepipe.transform(dataini, 'yyyy-MM-dd');
    this.datafim = this.datepipe.transform(datafim, 'yyyy-MM-dd');

    this.movimentoService.getByProvento(this.dataini, this.datafim).subscribe(data=> {
      this.proventos = data;
    });    
  }

}
