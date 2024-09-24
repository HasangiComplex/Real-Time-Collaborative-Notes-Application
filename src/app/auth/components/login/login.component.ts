import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth-services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router:Router ,
              private fb: FormBuilder ,
              private authenticationService : AuthenticationService,
              private snackBar: MatSnackBar) {
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
    })
      .subscribe(
        () => {
          this.showToast('Login successful', 'success-toast');
          this.router.navigate(['viewNotes']);
        },
        (error) => {
          this.showToast('Invalid email or password', 'error-toast');
        }
      );
  }

  createAccount() {
    this.router.navigate(['register'])
  }

  private showToast(message: string, cssClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: cssClass, // Custom class for styling
    });
  }

  private passwordValidator(control: any) {
    const value = control.value;
    if (value && (value.length < 8 || !/[A-Z]/.test(value) || !/[0-9]/.test(value))) {
      return { weakPassword: true };
    }
    return null;
  }
}


