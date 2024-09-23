import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth-services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide = true;
  constructor(private router:Router,
              private fb: FormBuilder ,
              private authenticationService : AuthenticationService,
              private snackBar: MatSnackBar) {
  }

  registerForm = this.fb.group({
    username: [''],
    password: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
  })


  // firebase authentication for Sign up
  proceedAfterSignUp() {
    if (this.registerForm.valid) {
      this.authenticationService.signUp(
        this.registerForm.value.email || '',
        this.registerForm.value.password || ''
      ).then(() => {
        this.showToast("Registration Successful.", "error-toast");
        this.router.navigate(['viewNotes']);
      }).catch(error => {
        this.showToast("Invalid email or password. Please try again.", "error-toast");
      });
    } else {
      this.showToast("Please fill in all fields with valid information.", "error-toast");
    }
  }

  backToLogin() {
    this.router.navigate(['login'])
  }

  private showToast(message: string, cssClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: cssClass, // Custom class for styling
    });
  }
}
