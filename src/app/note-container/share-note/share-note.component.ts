import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-share-note',
  templateUrl: './share-note.component.html',
  styleUrls: ['./share-note.component.scss']
})
export class ShareNoteComponent {

  authorizedUserList: string[] = ['vvcJ7pJnFKRqlUxU5THRasWENd22', 'akb4Ob34jXRTECs7xjMqorRiDOY2', 'NB5Hez3cxpQOvObZvodjIgzt20L2', 'x3zcjMGu15ZB0CM5sHsciwRBS003', 'eFwh1yJyXwMJwhmRCxO939Fpval2'];
  shareNoteForm: FormGroup;

  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              @Inject(MAT_DIALOG_DATA) public data: { noteId: string }
  ) {
    this.shareNoteForm = this.fb.group({


      selectedUsers: [[]]  // Starts with an empty array for multi-select options
    });
  }

  shareForUser() {
    const selectedUsers = this.shareNoteForm.get('selectedUsers')?.value;

    // Assuming the note is stored at a specific database path, such as 'notes/{noteId}'
    const noteId = this.data.noteId;  // Replace this with the actual note ID

    // Reference to the note in the Firebase Realtime Database
    const noteRef = this.db.object(`/notes/${noteId}`);

    // Update the note with the new shared users
    noteRef.update({ shared_users: selectedUsers })
      .then(() => {
        console.log('Shared users successfully updated');
      })
      .catch((error) => {
        console.error('Error updating shared users:', error);
      });
  }


}
