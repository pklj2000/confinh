import { Component, OnInit, Inject } from '@angular/core';
import { BancoService } from '../../services/banco.service';
import { Observable } from 'rxjs';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-banco-list',
  templateUrl: './banco-list.component.html',
  styleUrls: ['./banco-list.component.css']
})
export class BancoListComponent implements OnInit {
  bancos: any = [];
  displayedColumns: string[] = ['id', 'nome', 'ativo', 'ordem', 'options'];
  loading: boolean = true;
  constructor(private bancoService: BancoService, private eventemit: EventEmitterService) { }

  ngOnInit() {
    this.eventemit.setNotificacao("", "");
    this.getBancos();
  }

  getBancos() {
    this.loading = true;
    this.bancos = [];
    this.bancoService.getAll().subscribe((data: {}) => {
      this.loading = false;
      this.bancos = data;
    });
  }
  
  delete(id: number){
    this.bancoService.delete(id).subscribe(
      (response) => {this.getBancos();},
      (error) => {
        console.log(error.message);
        this.eventemit.setNotificacao(error.message, "erro");
      }
    )
  }


}
