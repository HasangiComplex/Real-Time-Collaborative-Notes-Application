import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {SignupComponent} from "./auth/components/signup/signup.component";
import {NoteListComponent} from "./note-container/note-list/note-list.component";
import {NoteContainerComponent} from "./note-container/note-container.component";
import {NoteEditorComponent} from "./note-container/note-editor/note-editor.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:SignupComponent},
  {path:'viewNotes',component:NoteContainerComponent},
  {path:'viewNotes',component:NoteListComponent},
  {path:'listNotes',component:NoteListComponent},
  {path:'edit/:id',component:NoteEditorComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
