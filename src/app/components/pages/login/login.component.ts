import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserDto } from 'src/app/shared/model/UserDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService  
    ) {}

  onNoClick(): void {
   
  }

  onSubmit() {
    let redirectTo = '/';
    if (this.validarData("hpinto", "12345")) {
      redirectTo = '/error';
    }
    this.router.navigate([redirectTo]);
  }

  validarData (username: string, password:string) {
    let user: UserDto = {
      id: -1,
      tipoUsuario: -1,
      estado: -1,
      username: username,
      password: password
    }
    return this.loginService
      .obtenerUsuario(user)
      .subscribe({
        next: (user) => {
          return true; //modificar mas tarde
        },
        error: (e) => {
          return false; //modificar mas tarde
        },
      });
  }  
}
