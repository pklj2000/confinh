import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { EventEmitterService } from './services/event-emitter.service';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BancoListComponent } from './banco/banco-list/banco-list.component';
import { BancoCreateComponent } from './banco/banco-create/banco-create.component';
import { NotificacaoComponent } from './layout/notificacao.component';
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
import { PosicaoValorDialogComponent } from './posicao/posicao-valor-dialog/posicao-valor-dialog.component';
import { PosicaoEditComponent } from './posicao/posicao-edit/posicao-edit.component';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { AplicacaoSelectDialogComponent } from './aplicacao/aplicacao-select-dialog/aplicacao-select-dialog.component';
import { ErrorMessageComponent } from './dialogs/error-message/error-message.component';
import { PosicaoDashboardComponent } from './posicao/posicao-dashboard/posicao-dashboard.component';
import { AplicacaoList2Component } from './aplicacao/aplicacao-list2/aplicacao-list2.component';
import { MovimentoImportComponent } from './movimento/movimento-import/movimento-import.component';
import { MovimentoList2Component } from './movimento/movimento-list2/movimento-list2.component';
import { IrpfListComponent } from './irpf/irpf-list/irpf-list.component';
import { CotacaoImportComponent } from './cotacao/cotacao-import/cotacao-import.component';
import { ProventoImportComponent } from './provento/provento-import/provento-import.component';
import { ProventoAdminComponent } from './provento/provento-admin/provento-admin.component';
import { MovimentoProventoAcumComponent } from './movimento/movimento-provento-acum/movimento-provento-acum.component';
import { EstoqueList2Component } from './estoque/estoque-list2/estoque-list2.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BancoListComponent,
    BancoCreateComponent,
    NotificacaoComponent,
    BancoEditComponent,
    TipoListComponent,
    TipoCreateComponent,
    TipoEditComponent,
    AplicacaoListComponent,
    AplicacaoCreateComponent,
    AplicacaoEditComponent,
    AplicacaoList2Component,
    MovimentoListComponent,
    MovimentoCreateComponent,
    EstoqueListComponent,
    EstoqueAdminComponent,
    PosicaoListComponent,
    PosicaoCreateComponent,
    PosicaoValorDialogComponent,
    PosicaoEditComponent,
    ConfirmDeleteComponent,
    AplicacaoSelectDialogComponent,
    ErrorMessageComponent,
    PosicaoDashboardComponent,
    AplicacaoList2Component,
    MovimentoImportComponent,
    MovimentoList2Component,
    IrpfListComponent,
    CotacaoImportComponent,
    ProventoImportComponent,
    ProventoAdminComponent,
    MovimentoProventoAcumComponent,
    EstoqueList2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  bootstrap: [AppComponent],
  providers: [
    EventEmitterService,
    DatePipe
  ],
  entryComponents: [PosicaoValorDialogComponent, ConfirmDeleteComponent, AplicacaoSelectDialogComponent]
})
export class AppModule { }
