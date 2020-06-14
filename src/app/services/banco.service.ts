import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Banco } from '../model/banco';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  constructor(private http: HttpClient) { }

  endpoint = environment.endpoint;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getAll(): Observable<any> {
    return this.http.get(this.endpoint + 'banco').pipe(
      map(this.extractData));  
  }

  getById(id: number): Observable<any>{
    return this.http.get<Banco>(this.endpoint + 'banco/' + id);
  }

  insert(banco: Banco): Observable<any> {
    return this.http.post<any>(this.endpoint + 'banco', JSON.stringify(banco) , this.httpOptions).pipe(
      tap(_ => console.log(`banco inserido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  update(banco: Banco): Observable<any> {
    return this.http.put<any>(this.endpoint + 'banco', JSON.stringify(banco) , this.httpOptions).pipe(
      tap(_ => console.log(`banco atualizado`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<any> {
    console.log(this.endpoint + 'banco/' + id);
    return this.http.delete<any>(this.endpoint + 'banco/' + id).pipe(
      tap(_ => console.log(`banco excluido`)),
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

