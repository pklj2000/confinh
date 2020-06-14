import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Movimento } from '../model/movimento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {
  endpoint = environment.endpoint;
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getAll(): Observable<any> {
    return this.http.get(this.endpoint + 'movimento').pipe(
      map(this.extractData));  
  }

  getById(id: number): Observable<any>{
    return this.http.get<Movimento>(this.endpoint + 'movimento/' + id);
  }

  getByBanco(idbanco: number): Observable<any>{
    return this.http.get<Movimento>(this.endpoint + 'movimento/byParams?idbanco=' + idbanco);
  }

  getByParams(idbanco: number, idaplicacao: number, data: string, idtipomovimento: string, datafim: string): Observable<any>{
    return this.http.get<Movimento>(this.endpoint + 'movimento/byParams?idbanco=' + idbanco + '&idaplicacao=' + idaplicacao + '&datamov=' + data + '&idtipomovimento=' + idtipomovimento + '&datamovfim=' + datafim);
  }

  getByProvento(dataini: string, datafim: string){
    return this.http.get<Movimento>(this.endpoint + 'movimento/GetByProvento?dataini=' + dataini + '&datafim=' + datafim);
  }

  insert(movimento: Movimento): Observable<any> {
    console.log(movimento);
    return this.http.post<any>(this.endpoint + 'movimento', JSON.stringify(movimento) , this.httpOptions).pipe(
      tap(_ => console.log(`movimento inserido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  insertByDescricao(movimento: Movimento): Observable<any> {
    console.log(movimento);
    return this.http.post<any>(this.endpoint + 'movimento/InsertByText', JSON.stringify(movimento) , this.httpOptions).pipe(
      tap(_ => console.log(`movimento inserido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  update(movimento: Movimento): Observable<any> {
    return this.http.put<any>(this.endpoint + 'movimento', JSON.stringify(movimento) , this.httpOptions).pipe(
      tap(_ => console.log(`movimento atualizado`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<any> {
    console.log(this.endpoint + 'movimento/' + id);
    return this.http.delete<any>(this.endpoint + 'movimento/' + id).pipe(
      tap(_ => console.log(`movimento excluido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'movimento').pipe(
      tap(_ => console.log(`movimentos excluidos`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  recalcularestoque(): Observable<any>{
    return this.http.get<any>(this.endpoint + 'movimento/recalcular').pipe(
      tap(_ => console.log(`movimentos recalculados`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
