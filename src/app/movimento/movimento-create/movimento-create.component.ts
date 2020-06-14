import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BancoService } from '../../services/banco.service';
import { AplicacaoService } from '../../services/aplicacao.service';
import { MovimentoService } from '../../services/movimento.service';
import { EstoqueService } from '../../services/estoque.service';
import { Estoque } from '../../model/estoque';
import { Movimento } from '../../model/movimento';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-movimento-create',
  templateUrl: './movimento-create.component.html',
  styleUrls: ['./movimento-create.component.css']
})
export class MovimentoCreateComponent implements OnInit {
  movimentoForm = new FormGroup({
    data: new FormControl('', Validators.required),
    banco: new FormControl('', Validators.required),
    aplicacao: new FormControl('', Validators.required),
    movimento: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    total1: new FormControl('', Validators.required),
    taxas: new FormControl(''),
    total2: new FormControl('')
  });

  bancos: Observable<any>;
  aplicacoes: Observable<any>;
  movimento: Movimento = new Movimento();

  constructor(private bancoService: BancoService,
    private aplicacaoService: AplicacaoService,
    private movimentoService: MovimentoService,
    private estoqueService: EstoqueService,
    private router: Router,
    private eventemit: EventEmitterService
    ) { }

  ngOnInit() {
    this.bancos = this.bancoService.getAll();
    this.aplicacoes = this.aplicacaoService.getByParams("1","","");

    this.movimentoForm.get('valor').valueChanges.subscribe(() => {
      this.calcularTotal();
    });

    this.movimentoForm.get('quantidade').valueChanges.subscribe(() => {
      this.calcularTotal();
    });
  }

  calcularTotal() {
    let _total = this.movimentoForm.get('valor').value * this.movimentoForm.get('quantidade').value;
    this.movimentoForm.get('total1').setValue(_total);
  }


  onSubmit() {
    let _data = this.movimentoForm.get("data").value;
    this.movimento.id  = 0;
    this.movimento.data = _data;
    this.movimento.idbanco = +this.movimentoForm.get("banco").value;
    this.movimento.idaplicacao = +this.movimentoForm.get("aplicacao").value;
    this.movimento.idtipomovimento = this.movimentoForm.get("movimento").value;
    this.movimento.quantidade = +this.movimentoForm.get("quantidade").value;
    this.movimento.valorun = +this.movimentoForm.get("valor").value;
    this.movimento.valorTotal = +this.movimentoForm.get("total1").value;
    console.log(this.movimento);
    this.movimentoService.insert(this.movimento).subscribe(
      () => {
        
        this.AtualizarEstoque();
        this.router.navigate(['/movimento']);
      },
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    );
  }
  

  AtualizarEstoque(){
    let _updated = false;
    this.estoqueService.getByAplicacao(this.movimento.idaplicacao).subscribe(estoques => {

      if (!_updated) {
        _updated = true;
        if (estoques.length == 0) {
          let _estoqueRef: Estoque = new Estoque();
          _estoqueRef.idbanco = this.movimento.idbanco;
          _estoqueRef.idAplicacao = this.movimento.idaplicacao;
          _estoqueRef.quantidade = this.movimento.quantidade;
          _estoqueRef.valorMedio = this.movimento.valorun;
          _estoqueRef.total = this.movimento.valorTotal;

          this.estoqueService.insert(_estoqueRef).subscribe(
            () => {},
            (error) => {
              console.log(error.message);
              this.eventemit.setNotificacao(error.message, "erro");
              return;
            });
        } else {
          if (estoques.length > 0) {
            let _estoqueRef = estoques[0];

            if (this.movimento.idtipomovimento == "C") {
              _estoqueRef.valorMedio = (+_estoqueRef.quantidade * +_estoqueRef.valorMedio + +this.movimento.quantidade * +this.movimento.valorun) / (+_estoqueRef.quantidade + +this.movimento.quantidade)
              _estoqueRef.quantidade = +_estoqueRef.quantidade + +this.movimento.quantidade;
              _estoqueRef.total = +_estoqueRef.valorMedio * +_estoqueRef.quantidade
            } else {
              _estoqueRef.quantidade = +_estoqueRef.quantidade - +this.movimento.quantidade;
              _estoqueRef.total = +_estoqueRef.valorMedio * +_estoqueRef.quantidade
            }
            this.estoqueService.update(_estoqueRef).subscribe(
              () => {},
              (error) => {
                console.log(error.message);
                this.eventemit.setNotificacao(error.message, "erro");
                return;
              });
          }
        }
      }
    });
  }
}
