import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BancoService } from '../../services/banco.service';
import { Banco } from '../../model/banco';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-banco-edit',
  templateUrl: './banco-edit.component.html',
  styleUrls: ['./banco-edit.component.css']
})
export class BancoEditComponent implements OnInit {
  id: number;
  banco: Banco;

  bancoForm = new FormGroup({
    id: new FormControl({value: null, disabled: true}),
    nome: new FormControl('', Validators.required),
    ativo: new FormControl('', Validators.required),
    ordem: new FormControl('', Validators.required),
  });

  constructor(private bancoService: BancoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private eventemit: EventEmitterService) { 
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    
    this.bancoService.getById(this.id).subscribe((data: any) => {
      this.bancoForm.controls['id'].setValue(data.id);
      this.bancoForm.controls['nome'].setValue(data.nome);
      this.bancoForm.controls['ativo'].setValue(data.ativo == "1");
      this.bancoForm.controls['ordem'].setValue(data.ordem);
    });
  }

  onSubmit(){
    let _banco: Banco = new Banco();
    _banco.id = +this.bancoForm.get("id").value;
    _banco.nome = this.bancoForm.get("nome").value;
    _banco.ativo = this.bancoForm.get("ativo").value ? "1": "0";
    _banco.ordem =  +this.bancoForm.get("ordem").value;

    this.bancoService.update(_banco).subscribe(
      (response) => {this.router.navigate(['/banco']);},
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    )
  }

}
