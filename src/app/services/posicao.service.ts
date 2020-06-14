import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Posicao } from '../model/posicao';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosicaoService {
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
    return this.http.get(this.endpoint + 'posicao').pipe(
      map(this.extractData));  
  }

  getById(id: number): Observable<any>{
    return this.http.get<Posicao>(this.endpoint + 'posicao/' + id);
  }

  getByData(data: string): Observable<any>{
    return this.http.get<Posicao>(this.endpoint + 'posicao/byParams?data=' + data);
  }

  getDatas(): Observable<any>{
    return this.http.get<Posicao>(this.endpoint + 'posicaodata');
  }

  getAc(tipo: number, data: string): Observable<any>{
    return this.http.get<number>(this.endpoint + `posicao/acumulado?tipo=${tipo}&data=${data}`);
  }

  insert(posicao: Posicao): Observable<any> {
    return this.http.post<any>(this.endpoint + 'posicao', JSON.stringify(posicao) , this.httpOptions).pipe(
      tap(_ => console.log(`posicao inserido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  insertData(data: Date){
    let _posicaoData = {'Data': data};
    return this.http.post<any>(this.endpoint + 'posicaodata', JSON.stringify(_posicaoData), this.httpOptions).pipe(
      tap(_ => console.log(`data inserida`)),
      catchError((error) => {
        return throwError(error);
      })
    )
  }

  update(posicao: Posicao): Observable<any> {
    return this.http.put<any>(this.endpoint + 'posicao', JSON.stringify(posicao) , this.httpOptions).pipe(
      tap(_ => console.log(`posicao atualizado`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  delete(id: string): Observable<any> {
    console.log(this.endpoint + 'posicao/' + id);
    return this.http.delete<any>(this.endpoint + 'posicao/' + id).pipe(
      tap(_ => console.log(`posicao excluido`)),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteByData(data: string): Observable<any>{
    return this.http.delete<any>(this.endpoint + 'posicaodata/' + data).pipe(

    )
  }

}
