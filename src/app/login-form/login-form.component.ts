import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModalService } from './login-modal.service';
import { User } from './user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  isLoginMode = false;
  user: User = {
    email: "",
    password: ""
  }
  users: User[] = [];
  isUserRegist: boolean = false;

  constructor(public http:HttpClient, public activeModal: NgbActiveModal, public router: Router, public loginService: LoginModalService) { }


  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close();
  }
 // cambiar Login mode a Sign In mode
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    //obtener data de formulario
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    this.http.put(`${environment.USER_DATA}`, form.value).subscribe(res => (console.log(res)))



    //comprobar si el usuario esta en Localstorage (se mudo al servicio)

    // if (localStorage. getItem("users") === null) {
    //   localStorage.setItem("users", JSON.stringify(this.users));}
    //   else{

//     this.isUserRegist = this.loginService.isRegistered(this.user);
//     console.log(this.isUserRegist)}

//     if (this.isLoginMode) {
// // si es el modo de Login, comprobar si el usuario esta registardo
//       if (this.isUserRegist) {
//         console.log('User is logged');
//         this.activeModal.close();
//         this.router.navigate(['home'])
//       }
//       else {
//         console.log('Faile to login')
//       }


// // si es modo de registrarse, comprobar si esta registrado, si no - guardar en local storage
//     } else {
//     //  console.log(this.user);
//       this.users = JSON.parse(localStorage.getItem('users') || '');
//      // console.log(this.users);
//       if (this.isUserRegist) {
//         console.log('User is already registered');
//         this.isLoginMode = true
//       }
//       else {
//         this.users.push(this.user);
//         this.isLoginMode = true

//       }
//       localStorage.setItem("users", JSON.stringify(this.users));
//     }

  }
}
