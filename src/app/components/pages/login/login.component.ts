import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalService } from 'src/app/services/local.service';
import { LoginService } from 'src/app/services/login.service';
import { UserDto } from 'src/app/shared/model/UserDto';
import { LoginDto } from 'src/app/shared/model/loginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private localStore: LocalService,
    private encrypt: EncryptDecryptService  
    ) {}

  ngOnInit() {
    console.log("limpiar data");
    this.localStore.clearData();
  }

  onSubmit() {
    this.validarData(this.username, this.password)
  }

  validarData (username: string, password:string) {
    let user: UserDto = {
      id: -1,
      username: username,
      password: this.encrypt.encryptUsingAES256(password),
      tipoUsuario: 0,
      estado: 0
    }
    console.log(user);
    return this.loginService
      .obtenerUsuario(user)
      .subscribe(
        {
          next: (resp: UserDto) => {
            console.log("respuesta "+resp);
            this.localStore.saveData('bearer', resp.username);
            this.router.navigate(['/home']);
          },
          error: (e) => {
            console.log(e) //modificar mas tarde
          },
        }
      );
  }  

  // validarData (username: string, password:string) {
  //   let user: LoginDto = {
  //     email: username,
  //     password: password
  //   }
  //   return this.loginService
  //     .login(user)
  //     .subscribe(
  //       {
  //         next: (resp: any) => {
  //           console.log(resp);
  //           this.localStore.saveData('bearer', resp.headers.get('Authorization'));
  //           this.router.navigate(['/home']);
  //         },
  //         error: (e) => {
  //           console.log(e) //modificar mas tarde
  //         },
  //       }
  //     );
  // }  

  
}
