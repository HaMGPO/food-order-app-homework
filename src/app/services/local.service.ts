import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private router: Router,) { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public checkPersistance() {
    if (localStorage.getItem('bearer') === null) {
      console.log('No hay token de autenticaciond declarado')
      this.router.navigate(['/login']);
    } else {
      console.log('Session activa');
      console.log(localStorage.getItem('bearer'));
    }
  }
}
