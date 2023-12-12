import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  ) {}

  onNoClick(): void {
   
  }

  onSubmit() {
    let redirectTo = '/dashboard';
    if (this.validarData("hpinto", "12345")) {
      redirectTo = '/error';
    }
    this.router.navigate([redirectTo]);
  }

  validarData (username: string, password:string) {
    return ((username != this.username) ||  (password != this.password)); 
  }  
}
