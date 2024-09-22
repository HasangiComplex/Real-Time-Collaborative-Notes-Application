import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { NoteListComponent } from './note-container/note-list/note-list.component';
import { NoteEditorComponent } from './note-container/note-editor/note-editor.component';
import { NoteViewerComponent } from './note-container/note-viewer/note-viewer.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import { NoteContainerComponent } from './note-container/note-container.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { NoteCardComponent } from './note-container/note-card/note-card.component';
import { CreateCardComponent } from './note-container/create-card/create-card.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { DeleteCardComponent } from './note-container/delete-card/delete-card.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {authReducer} from "./states/auth.reducer";
import { ShareNoteComponent } from './note-container/share-note/share-note.component';
import { FilterByTagPipe } from './pipes/filter-by-tag.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NoteListComponent,
    NoteEditorComponent,
    NoteViewerComponent,
    LoginComponent,
    SignupComponent,
    NoteContainerComponent,
    NoteCardComponent,
    CreateCardComponent,
    DeleteCardComponent,
    ShareNoteComponent,
    FilterByTagPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    AngularFireModule.initializeApp(
      {
        apiKey: "AIzaSyDn5ZScBvG-goRbP4sZoY_Fx-sHXG8fP0M",
        authDomain: "collaborative-note-app-3c358.firebaseapp.com",
        databaseURL: "https://collaborative-note-app-3c358-default-rtdb.firebaseio.com/",
        projectId: "collaborative-note-app-3c358",
        storageBucket: "collaborative-note-app-3c358.appspot.com",
        messagingSenderId: "125625170579",
        appId: "1:125625170579:web:688156179186a14c34ab66"
      }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forRoot({auth: authReducer})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
