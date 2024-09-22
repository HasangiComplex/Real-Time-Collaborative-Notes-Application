import { Injectable } from '@angular/core';
import {from, map, Observable, of} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$!: Observable<any>;
  constructor(private auth: AngularFireAuth) {
    // Create the user$ observable to track the authentication state
    this.user$ = this.auth.authState.pipe(
      map(user => user ? user : null) // Emit user object if logged in, otherwise emit null
    );
  }

  signIn(params: SignIn): Observable<any>{
    return from(this.auth.signInWithEmailAndPassword(
      params.email,params.password
    ))
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {

    //     this.SendVerificationMail();
    //     this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
  type SignIn = {
    email: string;
    password: string;
  }
