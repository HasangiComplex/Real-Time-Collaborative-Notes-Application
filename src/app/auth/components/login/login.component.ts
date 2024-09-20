import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth-services/authentication.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router:Router , private fb: FormBuilder , private authenticationService : AuthenticationService) {
  }

  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })



  // Firebase authentication for login
  proceedAfterLogin() {
    this.authenticationService.signIn({
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    }).subscribe(() => {
      this.router.navigate(['viewNotes'])
    },(error: any) => {
      console.error('Login failed', error);
    })
  }

  createAccount() {
    this.router.navigate(['register'])
  }

  onSubmitForLogin() {
    console.log("Login Successful",this.loginForm.value);
    // this.router.navigate(['viewNotes']);
  }
}
