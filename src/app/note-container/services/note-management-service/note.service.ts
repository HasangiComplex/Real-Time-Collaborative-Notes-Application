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


  // getNotes(): Observable<any[]> {
  //   return this.userId$.pipe(
  //     switchMap(userId => {
  //       // Retrieve all notes
  //       return this.db.list('notes').snapshotChanges().pipe(
  //         map(changes =>
  //           changes.map(c => {
  //             const note: any = c.payload.val();
  //             const sharedUsers = note?.shared_users || {}; // Adjusted key to match your structure
  //             const createdByUser = note.created_user === userId;
  //             const sharedWithUser = Object.values(sharedUsers).includes(userId);
  //
  //             // Return the note if created by the user or shared with the user
  //             if (createdByUser || sharedWithUser) {
  //               return { id: c.payload.key, ...(note || {}) };
  //             } else {
  //               return null; // Exclude this note
  //             }
  //           }).filter(note => note !== null) // Filter out null notes
  //         )
  //       );
  //     })
  //   );
  // }

  getNotes(): Observable<any[]> {
    return this.userId$.pipe(
      switchMap(userId => {
        return this.db.list('notes').snapshotChanges().pipe(
          map(changes =>
            changes.map(c => {
              const note: any = c.payload.val();
              const sharedUsers = note?.shared_users || {};
              const createdByUser = note.created_user === userId;
              const sharedWithUser = Object.values(sharedUsers).includes(userId);

              // Create the note object with boolean flags
              const noteWithFlags = {
                id: c.payload.key,
                ...(note || {}),
                sharedOthers: Object.keys(sharedUsers).length > 0,
                sharedWithMe: sharedWithUser,
              };

              // Return the note object
              return { noteWithFlags, createdByUser, sharedWithUser };
            })
          )
        ).pipe(
          map(noteData =>
            noteData
              .filter(({ createdByUser, sharedWithUser }) => createdByUser || sharedWithUser)
              .map(({ noteWithFlags }) => noteWithFlags)
          )
        );
      })
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
