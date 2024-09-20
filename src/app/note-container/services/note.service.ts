import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private db: AngularFireDatabase) {}

  getNotes(): Observable<any> {
    return this.db.list('notes').valueChanges();
  }

  getNoteById(noteId: string): Observable<any> {
    return this.db.object(`notes/${noteId}`).valueChanges();
  }

  updateNote(noteId: string, content: string) {
    return this.db.object(`notes/${noteId}`).update({ content });
  }
}
