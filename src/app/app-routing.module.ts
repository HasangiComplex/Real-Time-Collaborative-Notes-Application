import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NoteViewerComponent} from "./note-viewer/note-viewer.component";
import {LoginComponent} from "./auth/components/login/login.component";
import {SignupComponent} from "./auth/components/signup/signup.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:SignupComponent},
  {path:'viewNotes',component:NoteViewerComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
