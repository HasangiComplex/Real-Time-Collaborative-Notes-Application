import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateCardComponent} from "./create-card/create-card.component";
import {AuthenticationService} from "../auth/auth-services/authentication.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthState} from "../states/auth.reducer";
import {Store} from "@ngrx/store";
import { logout} from "../states/auth.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss']
})
export class NoteContainerComponent implements OnInit{
  @Output() searchQueryChange = new EventEmitter<string>();
  constructor(private router:Router,
              private dialog: MatDialog ,
              private auth: AngularFireAuth,
              private store: Store<AuthState>) {}
  ngOnInit(): void {
    this.checkAuthorization();
  }

  private checkAuthorization(): void {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
      }
    });
  }

  addNote(): void {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed:', result);
      }
    });
  }

  logout() {
    // Ensure `this.auth.currentUser` resolves to a user
    return this.auth.currentUser.then((user) => {
      const userId = user?.uid;

      if (userId) {
        return this.auth.signOut().then(() => {
          // Dispatch the logout action for this specific user
          this.store.dispatch(logout({ uid: userId }));
          this.router.navigate(['login']);
        });
      } else {
        return Promise.resolve(); // Ensuring a return value in case no user is logged in
      }
    }).catch(error => {
      return Promise.reject(error); // Ensuring a return value for the error case
    });
  }
}
