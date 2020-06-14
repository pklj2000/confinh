import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Setor } from '../model/setor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetorService {

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
    return this.http.get(this.endpoint + 'setor',{headers : {'Content-Type' : 'application/json; charset=UTF-8'}}).pipe(
      map(this.extractData));  
  }

  getById(id: number): Observable<any>{
    return this.http.get<Setor>(this.endpoint + 'setor/' + id);
  }

}
