import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProventoService {

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
    return this.http.get(this.endpoint + 'provento').pipe(
      map(this.extractData));  
  }
}
