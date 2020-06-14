import { Component, OnInit } from '@angular/core';
import { TipoService } from '../../services/tipo.service';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-tipo-list',
  templateUrl: './tipo-list.component.html',
  styleUrls: ['./tipo-list.component.css']
})
export class TipoListComponent implements OnInit {
  tipos: any = [];
  displayedColumns: string[] = ['id', 'nome', 'classe', 'ativo', 'ordem', 'options'];
  loading: boolean = true;
  
  constructor(private tipoService: TipoService, private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.eventemit.setNotificacao("", "");
    this.getTipos();
  }
  
  getTipos() {
    this.loading = true;
    this.tipos = [];
    this.tipoService.getAll().subscribe((data: {}) => {
      this.loading = false;
      this.tipos = data;
    });
  }

  delete(id: number){
    this.tipoService.delete(id).subscribe(
      (response) => {this.getTipos();},
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    )
  }
}
