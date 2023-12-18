import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserDto } from '../shared/model/UserDto'
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { LoginDto } from '../shared/model/loginDto';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

private hostUrl = "http://localhost:8084";
  private loginServiceUrl = '/v1/usuario/login';
  private visitServiceUrl = '/v1/mascotas';


  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localStorage.getData('bearer')}`
    }
    )
  };

  constructor(
    private http: HttpClient,
    private encryptDecrypt: EncryptDecryptService,
    private localStorage: LocalService
  ) { }

  login(usuario: LoginDto): Observable<any> {

    console.log(usuario);
    return this.http.post<any>('http://localhost:8084/login', usuario, {headers: {'Content-Type': 'application/json'}});
  }

  obtenerUsuario(usuario: UserDto): Observable<UserDto> {

    return this.http.post<UserDto>(this.hostUrl+this.loginServiceUrl, usuario, this.httpOptions);
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
