import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth-services/authentication.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private router:Router,private fb: FormBuilder , private authenticationService : AuthenticationService) {
  }

  registerForm = this.fb.group({
    username: [''],
    password: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
  })


  // firebase authentication for Sign up
  proceedAfterSignUp() {
    if (this.registerForm.valid) {
      this.authenticationService.signUp(
        this.registerForm.value.email || '',
        this.registerForm.value.password  || ''
      );
    }
  }

  backToLogin() {
    this.router.navigate(['login'])
  }

  onSubmitForSignup() {
    console.log("Form sent successfully ", this.registerForm.value);
    this.router.navigate(['viewNotes']);
  }
}
