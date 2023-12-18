import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserDto } from '../shared/model/UserDto'
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginServiceUrl = '/v1/usuario/login';
  private visitServiceUrl = '/v1/mascotas';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private encryptDecrypt: EncryptDecryptService
  ) { }

  obtenerUsuario(usuario: UserDto): Observable<UserDto[]> {

    // usuario.username = this.encryptDecrypt.encryptUsingAES256(usuario.username);
    // usuario.password = this.encryptDecrypt.encryptUsingAES256(usuario.password);
  
    return this.http.post<UserDto[]>(this.loginServiceUrl, usuario, this.httpOptions).pipe(
      catchError(this.handleError<UserDto[]>('autenticacion', []))
    );
  }

  addUsuario(usuario: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.visitServiceUrl, usuario, this.httpOptions).pipe(
      catchError(this.handleError<UserDto>('addHero'))
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
