import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserDto } from '../shared/model/UserDto'
import { VisitaDto } from '../shared/model/VisitDto';
import { MascotaDto } from '../shared/model/MascotaDto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginServiceUrl = 'api/tarjetasGraficas';
  private mascotaServiceUrl = 'api/tarjetasGraficas';
  private visitServiceUrl = 'api/tarjetasGraficas';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, //inyectamos este servicio para poder hacer peticiones http
  ) { }

  obtenerUsuario(usuario: UserDto): Observable<UserDto[]> {
    return this.http.post<UserDto[]>(this.loginServiceUrl, usuario, this.httpOptions).pipe(
      catchError(this.handleError<UserDto[]>('autenticacion', []))
    );
  }

  obtenerMascotasUsuario(usuario: UserDto) : Observable<UserDto> {
    const url = `${this.mascotaServiceUrl}/${usuario.username}`; //Estamos apuntando a un elemento de la base de datos con el username del suuario
    return this.http.get<UserDto>(url).pipe(
      //Manejo de errores en caso de no encontrar nada (404)
      catchError(this.handleError<UserDto>(`obtenerTarjetaGrafica id=${usuario.username}`))
    );
  }

  obtenerVisitasMascota(mascota: MascotaDto): Observable<MascotaDto> {
    const url = `${this.mascotaServiceUrl}/${mascota.id}`; //Estamos apuntando a un elemento de la base de datos con un id en especifico
    return this.http.get<MascotaDto>(url).pipe(
      //Manejo de errores en caso de no encontrar nada (404)
      catchError(this.handleError<MascotaDto>(`obtenerTarjetaGrafica id=${mascota.id}`))
    );
  }

  addUsuario(usuario: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.visitServiceUrl, usuario, this.httpOptions).pipe(
      catchError(this.handleError<UserDto>('addHero'))
    );
  }

  addMascota(visita: VisitaDto): Observable<VisitaDto> {
    return this.http.post<VisitaDto>(this.visitServiceUrl, visita, this.httpOptions).pipe(
      catchError(this.handleError<VisitaDto>('addHero'))
    );
  }

  addVisitaMascota(visita: VisitaDto): Observable<VisitaDto> {
    return this.http.post<VisitaDto>(this.visitServiceUrl, visita, this.httpOptions).pipe(
      catchError(this.handleError<VisitaDto>('addHero'))
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
