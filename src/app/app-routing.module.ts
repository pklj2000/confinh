import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BancoListComponent } from './banco/banco-list/banco-list.component';
import { BancoCreateComponent } from './banco/banco-create/banco-create.component';
import { BancoEditComponent } from './banco/banco-edit/banco-edit.component';
import { TipoListComponent } from './tipo/tipo-list/tipo-list.component';
import { TipoCreateComponent } from './tipo/tipo-create/tipo-create.component';
import { TipoEditComponent } from './tipo/tipo-edit/tipo-edit.component';
import { AplicacaoListComponent } from './aplicacao/aplicacao-list/aplicacao-list.component';
import { AplicacaoCreateComponent } from './aplicacao/aplicacao-create/aplicacao-create.component';
import { AplicacaoEditComponent } from './aplicacao/aplicacao-edit/aplicacao-edit.component';
import { MovimentoListComponent } from './movimento/movimento-list/movimento-list.component';
import { MovimentoCreateComponent } from './movimento/movimento-create/movimento-create.component';
import { EstoqueListComponent } from './estoque/estoque-list/estoque-list.component';
import { EstoqueAdminComponent } from './estoque/estoque-admin/estoque-admin.component';
import { PosicaoListComponent } from './posicao/posicao-list/posicao-list.component';
import { PosicaoCreateComponent } from './posicao/posicao-create/posicao-create.component';
import { PosicaoEditComponent } from './posicao/posicao-edit/posicao-edit.component';
import { PosicaoDashboardComponent } from './posicao/posicao-dashboard/posicao-dashboard.component';
import { AplicacaoList2Component } from './aplicacao/aplicacao-list2/aplicacao-list2.component';
import { MovimentoImportComponent } from './movimento/movimento-import/movimento-import.component';
import { MovimentoList2Component } from './movimento/movimento-list2/movimento-list2.component';
import { IrpfListComponent } from './irpf/irpf-list/irpf-list.component';
import { CotacaoImportComponent } from './cotacao/cotacao-import/cotacao-import.component';
import { ProventoImportComponent } from './provento/provento-import/provento-import.component';
import { ProventoAdminComponent } from './provento/provento-admin/provento-admin.component';
import { EstoqueList2Component } from './estoque/estoque-list2/estoque-list2.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'banco', component: BancoListComponent},
    { path: 'banco/create', component: BancoCreateComponent},
    { path: 'banco/edit/:id', component: BancoEditComponent},
    { path: 'tipo', component: TipoListComponent },
    { path: 'tipo/create', component: TipoCreateComponent},
    { path: 'tipo/edit/:id', component: TipoEditComponent},
    { path: 'aplicacao', component: AplicacaoListComponent},
    { path: 'aplicacao/create', component: AplicacaoCreateComponent},
    { path: 'aplicacao/list2', component: AplicacaoList2Component},
    { path: 'aplicacao/edit/:id', component: AplicacaoEditComponent},
    { path: 'movimento', component: MovimentoListComponent},
    { path: 'movimento/byParams', component: MovimentoListComponent },
    { path: 'movimento/create', component: MovimentoCreateComponent},
    { path: 'estoque', component: EstoqueListComponent },
    { path: 'estoque/byParams', component: EstoqueListComponent },
    { path: 'estoque/admin', component: EstoqueAdminComponent},
    { path: 'posicao', component: PosicaoListComponent},
    { path: 'posicao/create/:id', component: PosicaoCreateComponent },
    { path: 'posicao/create', component: PosicaoCreateComponent },
    { path: 'posicao/edit/:id', component: PosicaoEditComponent },
    { path: 'posicao/dashboard', component: PosicaoDashboardComponent},
    { path: 'movimento/import', component: MovimentoImportComponent },
    { path: 'movimento/list2', component: MovimentoList2Component},
    { path: 'irpf/list', component: IrpfListComponent },
    { path: 'cotacao/import', component: CotacaoImportComponent },
    { path: 'provento/import', component: ProventoImportComponent},
    { path: 'provento/admin', component: ProventoAdminComponent },
    { path: 'estoque/list2', component: EstoqueList2Component }
  ])], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
