import { NgModule } from '@angular/core';
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
    DeleteCardComponent
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
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
