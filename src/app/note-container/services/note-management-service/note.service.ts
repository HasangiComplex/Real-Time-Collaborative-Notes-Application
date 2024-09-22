import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, Observable, switchMap} from 'rxjs';
import {Store} from "@ngrx/store";
import {AuthState} from "../../../states/auth.reducer";
import {selectUserId} from "../../../states/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  userId$: Observable<string | null>;
  constructor(private db: AngularFireDatabase,
              private store: Store<AuthState>) {
    this.userId$ = this.store.select(selectUserId);
  }

  // Create a new note
  createNote(noteData: any): Promise<void> {
    return this.db.list('notes').push(noteData)
      .then(() => console.log('Note added successfully!'))
      .catch((error) => console.error('Error adding note: ', error));
  }

// //  Retrieve all notes
//   getNotes(): Observable<any[]> {
//     return this.db.list('notes').snapshotChanges().pipe(
//       map(changes =>
//         changes.map(c => {
//           const note = c.payload.val();
//           return {id: c.payload.key, ...(note || {})}; // Spread only if note is not null
//         })
//       )
//     );
//   }


  getNotes(): Observable<any[]> {
    return this.userId$.pipe(
      switchMap(userId =>
        this.db.list('notes', ref => ref.orderByChild('created_user').equalTo(userId)).snapshotChanges()
      ),
      map(changes =>
        changes.map(c => {
          const note: any = c.payload.val(); // Explicitly typing note as any to avoid errors
          const sharedUsers = note?.shared_users || {}; // Default to empty object if shared_users doesn't exist

          return { id: c.payload.key, ...(note || {}) };
        })
      )
    );
  }



  // Retrieve a note by its id
  getNoteById(id: string): Observable<any> {
    return this.db.object(`notes/${id}`).snapshotChanges().pipe(
      map(c => {
        const note = c.payload.val();
        return { id: c.payload.key, ...(note || {}) }; // Spread only if note is not null
      })
    );
  }

  updateNoteContent(noteId: string, content: string): void {
    this.db.object(`notes/${noteId}`).update({ description: content });
  }


  // Delete a note
  deleteNote(noteId: string): Promise<void> {
    return this.db.list('notes').remove(noteId)
      .then(() => console.log('Note deleted successfully'))
      .catch(error => console.error('Error deleting note:', error));
  }


}
