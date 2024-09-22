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
  searchQuery: string = '';


  constructor(private router:Router,private dialog: MatDialog , private auth: AngularFireAuth,private store: Store<AuthState>) {}
  ngOnInit(): void {
    this.checkAuthorization();
  }



  private checkAuthorization(): void {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
      }
      // Optionally: Add further checks to determine if the user is authorized.
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

  onSearchChange(query: string) {
    // Handle the search logic here
    this.searchQuery = query;
  }


  logout() {
    return this.auth.signOut().then(() => {
      this.store.dispatch(logout());
      this.router.navigate(['login'])
    });
  }
}
