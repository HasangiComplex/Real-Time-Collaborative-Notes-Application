// import { Injectable } from '@angular/core';
// import {AngularFireDatabase} from "@angular/fire/compat/database";
// import {map, Observable} from "rxjs";
//
// interface User {
//   email: string;
// }
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthorizedUserService {
//
//   constructor(private db: AngularFireDatabase) {}
//
//   getAuthorizedUsers(): Observable<{ id: string; userData: User } []> {
//     return this.db.list('users').snapshotChanges().pipe(
//       map(actions =>
//         actions.map(a => ({
//           id: a.payload.key, // User ID
//           ...a.payload.val() // User data (e.g., email)
//         }))
//       )
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { map, Observable } from "rxjs";

interface User {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizedUserService {

  constructor(private db: AngularFireDatabase) {}

  getAuthorizedUsers(): Observable<{ id: string | null; userData: User }[]> {
    return this.db.list('users').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.val(); // Get the data
          return {
            id: a.payload.key, // User ID
            userData: data ? (data as User) : { email: '' } // Type check and cast
          };
        })
      )
    );
  }
}
