import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';
import { Validators } from '@angular/forms';
import { BancoService } from '../../services/banco.service';
import { Banco } from '../../model/banco';

@Component({
  selector: 'app-banco-create',
  templateUrl: './banco-create.component.html',
  styleUrls: ['./banco-create.component.css']
})
export class BancoCreateComponent implements OnInit {
  bancoForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    ativo: new FormControl('', Validators.required),
    ordem: new FormControl('', Validators.required),
  });

  constructor(private bancoService: BancoService, private router: Router, private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.eventemit.setNotificacao("", "");
  }

  onSubmit(){
    let _banco: Banco = new Banco();
    _banco.id = +this.bancoForm.get("id").value;
    _banco.nome = this.bancoForm.get("nome").value;
    _banco.ativo = this.bancoForm.get("ativo").value ? "1": "0";
    _banco.ordem =  +this.bancoForm.get("ordem").value;

    this.bancoService.insert(_banco).subscribe(
      (response) => {this.router.navigate(['/banco']);},
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    )
    
  }

}
