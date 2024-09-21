import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  // constructor(private db: AngularFireDatabase) {}
  //
  // getNotes(): Observable<any> {
  //   return this.db.list('notes').valueChanges();
  // }
  //
  // getNoteById(noteId: string): Observable<any> {
  //   return this.db.object(`notes/${noteId}`).valueChanges();
  // }
  //
  // updateNote(noteId: string, content: string) {
  //   return this.db.object(`notes/${noteId}`).update({ content });
  // }
  constructor(private db: AngularFireDatabase) {}

  // Create a new note
  createNote(noteData: any): Promise<void> {
    return this.db.list('notes').push(noteData)
      .then(() => console.log('Note added successfully!'))
      .catch((error) => console.error('Error adding note: ', error));
  }

  // Retrieve all notes
  getNotes(): Observable<any[]> {
    return this.db.list('notes').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const note = c.payload.val();
          return { id: c.payload.key, ...(note || {}) }; // Spread only if note is not null
        })
      )
    );
  }

  // Update a note
  updateNote(noteId: string, noteData: any): Promise<void> {
    return this.db.list('notes').update(noteId, noteData)
      .then(() => console.log('Note updated successfully!'))
      .catch((error) => console.error('Error updating note: ', error));
  }

  // Delete a note
  deleteNote(noteId: string): Promise<void> {
    return this.db.list('notes').remove(noteId)
      .then(() => console.log('Note deleted successfully'))
      .catch(error => console.error('Error deleting note:', error));
  }








}
