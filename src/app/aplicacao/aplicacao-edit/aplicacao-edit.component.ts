import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';
import { Validators } from '@angular/forms';
import { AplicacaoService } from '../../services/aplicacao.service';
import { Aplicacao } from '../../model/aplicacao';
import { Observable } from 'rxjs';
import { TipoService } from 'src/app/services/tipo.service';
import { SetorService } from 'src/app/services/setor.service';

@Component({
  selector: 'app-aplicacao-edit',
  templateUrl: './aplicacao-edit.component.html',
  styleUrls: ['./aplicacao-edit.component.css']
})
export class AplicacaoEditComponent implements OnInit {
  aplicacaoForm = new FormGroup({
    id: new FormControl('', Validators.required ),
    codigo: new FormControl('', Validators.required),
    idtipo: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    ativo: new FormControl('', Validators.required),
    ordem: new FormControl('', Validators.required),
    cnpj: new FormControl(''),
    idsetor: new FormControl('')
  });

  id: number;
  tipos: Observable<any>;
  setores: Observable<any>;

  constructor(private aplicacaoService: AplicacaoService, 
    private tipoService: TipoService,
    private setorService: SetorService,
    private router: Router, 
    private route: ActivatedRoute,
    private eventemit: EventEmitterService) {
      this.id = this.route.snapshot.params['id'];
     }

  ngOnInit() {
    this.eventemit.setNotificacao("", "");
    this.tipos = this.tipoService.getAll();
    this.setores = this.setorService.getAll();

    this.aplicacaoService.getById(this.id).subscribe((data: any) => {
      this.aplicacaoForm.controls['codigo'].setValue(data.codigo);      
      this.aplicacaoForm.controls['nome'].setValue(data.nome);
      this.aplicacaoForm.controls['ativo'].setValue(data.ativo == "1");
      this.aplicacaoForm.controls['ordem'].setValue(data.ordem);
      this.aplicacaoForm.controls['idtipo'].setValue(data.idTipo);
      this.aplicacaoForm.controls['cnpj'].setValue(data.cnpj);
      this.aplicacaoForm.controls['idsetor'].setValue(data.idSetor == null ? 41 : data.idSetor);
    });
  }

  onSubmit(){

    if (!this.ValidarCampos()) return;

    let _aplicacao: Aplicacao = new Aplicacao();
    _aplicacao.id = +this.id;
    _aplicacao.codigo = this.aplicacaoForm.get("codigo").value;
    _aplicacao.nome = this.aplicacaoForm.get("nome").value;
    _aplicacao.ativo = this.aplicacaoForm.get("ativo").value ? "1": "0";
    _aplicacao.ordem =  +this.aplicacaoForm.get("ordem").value;
    _aplicacao.idTipo = +this.aplicacaoForm.get("idtipo").value;
    _aplicacao.cnpj = this.aplicacaoForm.get("cnpj").value;
    _aplicacao.idsetor = +this.aplicacaoForm.get("idsetor").value;
    console.log(_aplicacao);

    this.aplicacaoService.update(_aplicacao).subscribe(
      (response) => {this.router.navigate(['/aplicacao']);},
      (error) => {
        this.setMessage(error.message, "erro");
      }
    )
  }

  setMessage(mensagem, tipo){
    this.eventemit.setNotificacao(mensagem, tipo);
  }

  ValidarCampos(){
    this.setMessage("","");
    if(this.aplicacaoForm.get("codigo").invalid){
      this.setMessage("Código é obrigatório", "erro");
      return false;
    }

    if(this.aplicacaoForm.get("nome").invalid){
      this.setMessage("Nome é obrigatório", "erro");
      return false;
    }

    if(this.aplicacaoForm.get("ordem").invalid){
      this.setMessage("Ordem é obrigatório", "erro");
      return false;
    }

    if(this.aplicacaoForm.get("idtipo").invalid){
      this.setMessage("Tipo é obrigatório", "erro");
      return false;
    }
    return true;
  }

}

