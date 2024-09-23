import {Component, OnInit} from '@angular/core';
import {AuthState} from "./states/auth.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectUserEmail, selectUserId} from "./states/auth.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'collaborative-notes';
  userId$: Observable<string | null>;
  userEmail$: Observable<string | null>;

  constructor(private store: Store<AuthState>) {
    this.userId$ = this.store.select(selectUserId);
    this.userEmail$ = this.store.select(selectUserEmail);
  }

  ngOnInit(): void {
  }
}
