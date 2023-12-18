import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../shared/model/UserDto';
import { Observable, catchError, of } from 'rxjs';
import { MascotaDto } from '../shared/model/MascotaDto';
import { VisitaDto } from '../shared/model/VisitDto';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private apiUrl = 'http://localhost:8084/v1/mascotas';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localStorage.getData('bearer')}`
    }
    )
  };

  constructor(
    private http: HttpClient,
    private localStorage: LocalService
  ) { }

  public obtenerTodasMascotas(
  ): Observable<MascotaDto[]> {

    const endPoint: string = '/all';
    const url = `${this.apiUrl}${endPoint}`; // api/form/producto/fecha

    console.log('Obtener mascota Propietario');

    return this.http.get<MascotaDto[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<MascotaDto[]>('Obtener mascota Propietario'))
    );
  }

  public obtenerMascotasPropietario(
    propietario: string
  ): Observable<MascotaDto[]> {

    const endPoint: string = '/petOwner';
    const params: string = `/${propietario}`;
    const url = `${this.apiUrl}${endPoint}${params}`; // api/form/producto/fecha

    console.log('Obtener mascota Propietario');

    return this.http.get<MascotaDto[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<MascotaDto[]>('addHero'))
    );
  }

  public obtenerMascotaID(
    id: number
  ): Observable<MascotaDto> {

    const endPoint: string = '/petId';
    const params: string = `/${id}`;
    const url = `${this.apiUrl}${endPoint}${params}`; // api/form/producto/fecha

    console.log('Obtener mascota Propietario');

    return this.http.get<MascotaDto>(url, this.httpOptions).pipe(
      catchError(this.handleError<MascotaDto>('addHero'))
    );
  } 

  public obtenerVisitasMascota(
    idMascota: number
  ): Observable<VisitaDto[]> {

    const endPoint: string = '/logs';
    const params: string = `/${idMascota}`;
    const url = `${this.apiUrl}${endPoint}${params}`; // api/form/producto/fecha

    return this.http.get<VisitaDto[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<VisitaDto[]>('addHero'))
    );
  }
  
  public addSaveMascota(
    mascota: MascotaDto 
  ): Observable<MascotaDto> {

    const endPoint: string = '';
    const url = `${this.apiUrl}/${endPoint}`; 

    return this.http.post<MascotaDto>(url, mascota, this.httpOptions).pipe(
      catchError(this.handleError<MascotaDto>('add / save mascota'))
    );
  }

  public addVisitaMascota(
    visita: VisitaDto 
  ): Observable<VisitaDto> {

    const endPoint: string = 'registro/';
    const url = `${this.apiUrl}/${endPoint}`; 

    return this.http.post<VisitaDto>(url, visita, this.httpOptions).pipe(
      catchError(this.handleError<VisitaDto>('addHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
