import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth-services/authentication.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
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

  onSubmitForLogin() {
    console.log("Login Successful",this.loginForm.value);
    // this.router.navigate(['viewNotes']);
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







// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, Validators } from '@angular/forms';
// import { AuthenticationService } from '../../auth-services/authentication.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { MatSnackBar } from '@angular/material/snack-bar';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   loginForm = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required],
//   });
//
//
//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private authenticationService: AuthenticationService,
//     private snackBar: MatSnackBar
//   ) {}
//
//   onSubmitForLogin() {
//     if (this.loginForm.invalid) {
//       this.loginForm.markAllAsTouched(); // Mark all fields as touched to show errors
//       return;
//     }
//
//     this.authenticationService
//       .signIn({
//         email: this.loginForm.value.email  || '',
//         password: this.loginForm.value.password  || '',
//       })
//       .subscribe(
//         () => {
//           this.showToast('Login successful', 'success-toast');
//           this.router.navigate(['viewNotes']);
//         },
//         (error) => {
//           this.showToast('Invalid email or password', 'error-toast');
//         }
//       );
//   }
//
//   createAccount() {
//     this.router.navigate(['register']);
//   }
//
//   private showToast(message: string, cssClass: string) {
//     this.snackBar.open(message, 'Close', {
//       duration: 3000,
//       verticalPosition: 'top',
//       horizontalPosition: 'right',
//       panelClass: cssClass, // Custom class for styling
//     });
//   }
// }
