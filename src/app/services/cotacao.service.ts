import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Cotacao } from '../model/cotacao';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {
  endpoint = environment.endpoint;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getByData(data: string): Observable<any>{
    return this.http.get<Cotacao>(this.endpoint + 'cotacao/' + data);
  }

  getDataCorrente(): Observable<any>{
    return this.http.get<string>(this.endpoint + 'cotacao/datacotacao');
  }

  getCotacaoCorrente(): Observable<any>{
    return this.http.get<string>(this.endpoint + 'cotacao/cotacaocorrente');
  }

  insert(cotacao: Cotacao): Observable<any> {
    console.log(this.endpoint + 'cotacao');
    console.log(JSON.stringify(cotacao));
    return this.http.post<any>(this.endpoint + 'cotacao', JSON.stringify(cotacao) , this.httpOptions).pipe(
      tap(_ => console.log(`aplicacao inserido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  delete(data: string): Observable<any> {
    console.log(this.endpoint + 'cotacao/' + data);
    return this.http.delete<any>(this.endpoint + 'cotacao/' + data).pipe(
      tap(_ => console.log(`cotacao excluido`)),
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
