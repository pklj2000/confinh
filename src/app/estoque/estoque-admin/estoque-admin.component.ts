import { Component, OnInit } from '@angular/core';
import { EstoqueService } from '../../services/estoque.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { MovimentoService } from 'src/app/services/movimento.service';
import { Estoque } from 'src/app/model/estoque';

@Component({
  selector: 'app-estoque-admin',
  templateUrl: './estoque-admin.component.html',
  styleUrls: ['./estoque-admin.component.css']
})
export class EstoqueAdminComponent implements OnInit {

  estoques: Array<Estoque>;
  estoque: Estoque;

  constructor(private estoqueService: EstoqueService,
    private movimentoService: MovimentoService,
    private eventemit: EventEmitterService) { }

  ngOnInit() {
  }

  RecalcularEstoque(){
    this.movimentoService.recalcularestoque().subscribe(
      (response) => {},
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    );

    /*
    this.estoques = new Array<Estoque>();

    this.estoqueService.deleteAll().subscribe(
    (response) => {
      this.movimentoService.getAll().subscribe(data=> {
        for (var i = 0, len = data.length; i < len; i++) {
          const result = this.estoques.filter(p=> p.idAplicacao == data[i].idAplicacao).filter(q=> q.idbanco == data[i].idBanco);
          if (result.length == 0){
            this.estoque = new Estoque();
            this.estoque.idAplicacao = data[i].idAplicacao;
            this.estoque.idbanco = data[i].idBanco;
            this.estoque.quantidade = 0;

            if (data[i].idTipoMovimento == "C"){
              this.estoque.quantidade = data[i].quantidade;
              this.estoque.valorMedio = data[i].valorUn;
              this.estoque.total = Math.round(this.estoque.quantidade * this.estoque.valorMedio * 100) / 100;
            } else {
              this.estoque.quantidade -= data[i].quantidade;
              this.estoque.total = Math.round(this.estoque.quantidade * this.estoque.valorMedio * 100) / 100;
            }
            this.estoques.push(this.estoque);

          } else {
            if (data[i].idTipoMovimento == "C"){          
              result[0].valorMedio = Math.round((((result[0].quantidade * result[0].valorMedio) + ( data[i].quantidade * data[i].valorUn)) / (result[0].quantidade + data[i].quantidade)) * 100) / 100;
              result[0].quantidade += data[i].quantidade;
              result[0].total = Math.round(result[0].valorMedio * result[0].quantidade *100) /100;
            } else {
              result[0].quantidade -= data[i].quantidade;
              result[0].total = Math.round(result[0].valorMedio * result[0].quantidade *100)/100;
            }

          }

        };

        let _estoqueCount = 0;
        for (var j = 0; j < this.estoques.length; j++){
          this.estoqueService.insert(this.estoques[j]).subscribe(
            (response) => {_estoqueCount++;},
            (error) => {
              console.log('Erro ao incluir item de estoque: ' + error.message);
            }
          )
        }
        console.log(this.estoques);
        this.eventemit.setNotificacao("Estoque recalculado. " + _estoqueCount + " itens incluídos", "sucesso");
      });
    },
    (error) => {
      console.log(error.message);
      this.eventemit.setNotificacao(error.message, "erro");
    })*/
  }

}
