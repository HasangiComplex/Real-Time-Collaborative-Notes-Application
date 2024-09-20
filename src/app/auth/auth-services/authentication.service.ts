import { Injectable } from '@angular/core';
import {from, Observable, of} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) { }

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
    //     /* Call the SendVerificaitonMail() function when new user sign
    //         up and returns promise */
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
