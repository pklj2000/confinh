import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Estoque } from '../model/estoque';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  //endpoint = 'http://localhost/confina/api/';
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
    return this.http.get(this.endpoint + 'estoque').pipe(
      map(this.extractData)
      );  
  }

  getById(id: number): Observable<any>{
    return this.http.get<Estoque>(this.endpoint + 'estoque/' + id);
  }

  getByAplicacao(idAplicacao: number): Observable<any>{
    return this.http.get(this.endpoint + 'estoque/byParams?idAplicacao=' + idAplicacao).pipe(
      map(this.extractData)
      );  
  }

  getCalculado(data: string): Observable<any>{
    return this.http.get(this.endpoint + 'estoque/calculado/data').pipe(
      map(this.extractData)
    );
  }

  getCalculadoBanco(data: string): Observable<any>{
    return this.http.get(this.endpoint + 'estoque/calculado/banco/' + data).pipe(
      map(this.extractData)
    )
  }

  getCalculadoSetor(data: string): Observable<any>{
    return this.http.get(this.endpoint + 'estoque/setor/' + data).pipe(
      map(this.extractData)
    );
  }

  insert(estoque: Estoque): Observable<any> {
    return this.http.post<any>(this.endpoint + 'estoque', JSON.stringify(estoque) , this.httpOptions).pipe(
      tap(_ => console.log(`estoque inserido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  update(estoque: Estoque): Observable<any> {
    return this.http.put<any>(this.endpoint + 'estoque', JSON.stringify(estoque) , this.httpOptions).pipe(
      tap(_ => console.log(`estoque atualizado`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<any> {
    console.log(this.endpoint + 'estoque/' + id);
    return this.http.delete<any>(this.endpoint + 'estoque/' + id).pipe(
      tap(_ => console.log(`estoque excluido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete<any>(this.endpoint + 'estoque/all').pipe(
      tap(_ => console.log(`estoque excluido`)),
      catchError((error) => {
        return throwError(error);
      })
    )
  }
 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}