import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Tipo } from '../model/tipo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
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
    return this.http.get(this.endpoint + 'tipo').pipe(
      map(this.extractData));  
  }

  getById(id: number): Observable<any>{
    return this.http.get<Tipo>(this.endpoint + 'tipo/' + id);
  }

  insert(tipo: Tipo): Observable<any> {
    return this.http.post<any>(this.endpoint + 'tipo', JSON.stringify(tipo) , this.httpOptions).pipe(
      tap(_ => console.log(`tipo inserido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  update(tipo: Tipo): Observable<any> {
    return this.http.put<any>(this.endpoint + 'tipo', JSON.stringify(tipo) , this.httpOptions).pipe(
      tap(_ => console.log(`tipo atualizado`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<any> {
    console.log(this.endpoint + 'tipo/' + id);
    return this.http.delete<any>(this.endpoint + 'tipo/' + id).pipe(
      tap(_ => console.log(`tipo excluido`)),
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
