import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder,FormGroup} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorizedUserService} from "../services/user-management-service/authorized-user.service";
import {User} from "../note-interfaces/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateCardComponent} from "../create-card/create-card.component";

@Component({
  selector: 'app-share-note',
  templateUrl: './share-note.component.html',
  styleUrls: ['./share-note.component.scss']
})
export class ShareNoteComponent implements OnInit{

  authorizedUserList: { id: string | null; userData: User }[] = [];
  shareNoteForm: FormGroup;

  constructor(private fb: FormBuilder,
              private db: AngularFireDatabase,
              @Inject(MAT_DIALOG_DATA) public data: { noteId: string },
              private authorizedUserService:AuthorizedUserService,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CreateCardComponent>
  ) {
    this.shareNoteForm = this.fb.group({
      selectedUsers: [[]]  // Starts with an empty array for multi-select options
    });
  }

  ngOnInit(): void {
    this.authorizedUserService.getAuthorizedUsers().subscribe(users => {
      this.authorizedUserList = users.filter(user => user.id !== null); // Filter out null IDs
    });
    }

  shareForUser() {
    const selectedUsers = this.shareNoteForm.get('selectedUsers')?.value;
    // Assuming the note is stored at a specific database path, such as 'notes/{noteId}'
    const noteId = this.data.noteId;
    // Reference to the note in the Firebase Realtime Database
    const noteRef = this.db.object(`/notes/${noteId}`);
    // Update the note with the new shared users
    noteRef.update({ shared_users: selectedUsers })
      .then(() => {
        this.showToast('User Added!', 'success-toast');
        this.dialogRef.close(true);
      })
      .catch((error) => {
        this.showToast('Error occured,When adding the user!', 'error-toast');
      });
  }

  private showToast(message: string, cssClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: cssClass, // Custom class for styling
    });
  }

}
