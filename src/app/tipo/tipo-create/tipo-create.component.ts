import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';
import { Validators } from '@angular/forms';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../model/tipo';

@Component({
  selector: 'app-tipo-create',
  templateUrl: './tipo-create.component.html',
  styleUrls: ['./tipo-create.component.css']
})
export class TipoCreateComponent implements OnInit {
  tipoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    ativo: new FormControl('', Validators.required),
    ordem: new FormControl('', Validators.required),
    classe: new FormControl('', Validators.required)
  });

  constructor(private tipoService: TipoService, private router: Router, private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.eventemit.setNotificacao("", "");
  }

  onSubmit(){
    let _tipo: Tipo = new Tipo();
    _tipo.id = 0;
    _tipo.nome = this.tipoForm.get("nome").value;
    _tipo.ativo = this.tipoForm.get("ativo").value ? "1": "0";
    _tipo.ordem =  +this.tipoForm.get("ordem").value;
    _tipo.classe = this.tipoForm.get("classe").value;

    console.log(_tipo);

    this.tipoService.insert(_tipo).subscribe(
      (response) => {this.router.navigate(['/tipo']);},
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    )
    
  }

}

