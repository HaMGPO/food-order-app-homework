import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserDto } from '../shared/model/UserDto'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginServiceUrl = 'api/tarjetasGraficas';  // URL to web api tarjetaGrafica
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, //inyectamos este servicio para poder hacer peticiones http
  ) { }

  obtenerUsuario(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.loginServiceUrl).pipe(
      catchError(this.handleError<UserDto[]>('obtenerTarjetasGraficas', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
}
