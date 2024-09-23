import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {NoteService} from "../services/note-management-service/note.service";
import {Store} from "@ngrx/store";
import {AuthState} from "../../states/auth.reducer";
import {Observable} from "rxjs";
import {selectUserId} from "../../states/auth.selectors";
import {MatSnackBar} from "@angular/material/snack-bar";


export interface TagsList {
  name: string | number;
}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})

export class CreateCardComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: TagsList[] = [];
  userId$: Observable<string | null>;

  constructor(public dialogRef: MatDialogRef<CreateCardComponent>,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private noteService: NoteService,
              private store: Store<AuthState>,
              private snackBar: MatSnackBar) {

    this.userId$ = this.store.select(selectUserId);
  }

  createNoteForm = this.fb.group({
    title: ['Title Goes here', Validators.required],
    description: [''],
    tags: [[] as TagsList[]],
  })

  ngOnInit(): void {

    console.log("The login user", this.userId$)
  }

  onConfirm(): void {
    // // this.dialogRef.close(true); // Passes data to the parent if needed
    // const noteData = {
    //   title: this.createNoteForm.value.title,
    //   description: this.createNoteForm.value.description,
    //   tags: this.tags.map(tag => tag.name),
    //   created_user:this.userId$,
    //   shared_users: []
    //
    // };
    // this.noteService.createNote(noteData).then(() => {
    //   this.dialogRef.close(true)
    // })

    if (this.createNoteForm.invalid || this.tags.length === 0) {
      this.showToast('Invalid attempt. You must fill the form.', 'error-toast');
      return;
    }

    this.userId$.subscribe(userId => {
      const noteData = {
        title: this.createNoteForm.value.title,
        description: this.createNoteForm.value.description,
        tags: this.tags.map(tag => tag.name),
        created_user: userId, // Append the userId from the observable
        shared_users: []
      };

      // this.noteService.createNote(noteData).then(() => {
      //   this.dialogRef.close(true);
      // });


      this.noteService.createNote(noteData)
        .then(() => {
          this.showToast('Note Added Successfully.', 'success-toast');
          this.dialogRef.close(true);
        })
        .catch((error) => {
          console.error(error); // Log the error for debugging
          this.showToast('Unable to add the note, Error Occurred.', 'error-toast');
        });
    });
  }

  // Add new tag
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new tag
    if (value) {
      this.tags.push({name: value});
    }
    // Update the form control for tags
    this.createNoteForm.get('tags')?.setValue(this.tags);
    // Clear the input value
    event.chipInput!.clear();

  }

  // Remove a tag
  removeTag(tag: TagsList): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    // Update the form control for tags
    this.createNoteForm.get('tags')?.setValue(this.tags);
  }

  //Edit a Tag
  editTag(tags: TagsList, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.removeTag(tags);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(tags);
    if (index >= 0) {
      this.tags[index].name = value;
    }

    // Update the form control for tags
    this.createNoteForm.get('tags')?.setValue(this.tags);
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
