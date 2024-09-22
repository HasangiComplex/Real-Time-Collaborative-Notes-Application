import { Injectable } from '@angular/core';
import {from, map, Observable, of, switchMap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthState} from "../../states/auth.reducer";
import {Store} from "@ngrx/store";
import {loginSuccess} from "../../states/auth.actions";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$!: Observable<any>;
  constructor(private auth: AngularFireAuth ,
              private store: Store<AuthState>,
              private db: AngularFireDatabase
              ) {
    // Create the user$ observable to track the authentication state
    this.user$ = this.auth.authState.pipe(
      map(user => user ? user : null) // Emit user object if logged in, otherwise emit null
    );
  }

  signIn(params: SignIn): Observable<any>{
    return from(this.auth.signInWithEmailAndPassword(
      params.email,params.password
    )).pipe(
      switchMap((userCredential) => {
        const uid = userCredential.user?.uid;
        const email = userCredential.user?.email;

        if (uid && email) {
          // Dispatch the loginSuccess action with UID and Email
          this.store.dispatch(loginSuccess({ uid, email }));
        }

        // Return the userCredential as an observable
        return from(Promise.resolve(userCredential));
      })
    );
  }

  // // Sign up with email/password
  // signUp(email: string, password: string) {
  //   return this.auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //
  //   //     this.SendVerificationMail();
  //   //     this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }


  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Store user ID and email in the Realtime Database
        const userId = result.user?.uid;
        if (userId) {
          this.db.list('users').set(userId, {
            email: email
          }).then(() => {
            console.log('User data saved to the database.');
          }).catch((error) => {
            console.error('Error saving user data: ', error);
          });
        }
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
