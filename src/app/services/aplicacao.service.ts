import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Aplicacao } from '../model/aplicacao';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoService {
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
    return this.http.get(this.endpoint + 'aplicacao').pipe(
      map(this.extractData));  
  }

  
  getById(id: number): Observable<any>{
    return this.http.get<Aplicacao>(this.endpoint + 'aplicacao/' + id);
  }

  getByParams(ativo: string,  aplicacaoNome: string, sort: string): Observable<any>{
    return this.http.get<Aplicacao>(this.endpoint + 'aplicacao/byParams?ativo=' + ativo +  '&aplicacao=' + aplicacaoNome + '&sort=' + sort);
  }

  insert(aplicacao: Aplicacao): Observable<any> {
    return this.http.post<any>(this.endpoint + 'aplicacao', JSON.stringify(aplicacao) , this.httpOptions).pipe(
      tap(_ => console.log(`aplicacao inserido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  update(aplicacao: Aplicacao): Observable<any> {
    return this.http.put<any>(this.endpoint + 'aplicacao', JSON.stringify(aplicacao) , this.httpOptions).pipe(
      tap(_ => console.log(`aplicacao atualizado`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<any> {
    console.log(this.endpoint + 'aplicacao/' + id);
    return this.http.delete<any>(this.endpoint + 'aplicacao/' + id).pipe(
      tap(_ => console.log(`aplicacao excluido`)),
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

