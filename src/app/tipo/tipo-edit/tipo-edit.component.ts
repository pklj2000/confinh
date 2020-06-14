import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../model/tipo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-tipo-edit',
  templateUrl: './tipo-edit.component.html',
  styleUrls: ['./tipo-edit.component.css']
})
export class TipoEditComponent implements OnInit {
  id: number;
  tipo: Tipo;

  tipoForm = new FormGroup({
    id: new FormControl({value: null, disabled: true}),
    nome: new FormControl('', Validators.required),
    ativo: new FormControl('', Validators.required),
    ordem: new FormControl('', Validators.required),
    classe: new FormControl('', Validators.required)
  });

  constructor(private tipoService: TipoService, 
    private router: Router, 
    private route: ActivatedRoute,
    private eventemit: EventEmitterService) { 
      this.id = this.route.snapshot.params['id'];
    }

  ngOnInit() {
    this.tipoService.getById(this.id).subscribe((data: any) => {
      console.log(data);
      this.tipoForm.controls['id'].setValue(data.id);
      this.tipoForm.controls['nome'].setValue(data.nome);
      this.tipoForm.controls['ativo'].setValue(data.ativo == "1");
      this.tipoForm.controls['ordem'].setValue(data.ordem);
      this.tipoForm.controls['classe'].setValue(data.classe);
    });
  }

  onSubmit(){
    let _tipo: Tipo = new Tipo();
    _tipo.id = +this.tipoForm.get("id").value;
    _tipo.nome = this.tipoForm.get("nome").value;
    _tipo.ativo = this.tipoForm.get("ativo").value ? "1": "0";
    _tipo.ordem =  +this.tipoForm.get("ordem").value;
    _tipo.classe = this.tipoForm.get("classe").value;

    this.tipoService.update(_tipo).subscribe(
      (response) => {this.router.navigate(['/tipo']);},
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    )
  }
}
