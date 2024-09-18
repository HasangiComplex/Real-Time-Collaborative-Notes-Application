import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private router:Router) {
  }

  proceedAfterSignUp() {
    this.router.navigate(['viewNotes'])
  }


  backToLogin() {
    this.router.navigate(['login'])
  }
}
