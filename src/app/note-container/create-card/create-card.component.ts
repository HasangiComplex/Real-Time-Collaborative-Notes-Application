import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {AngularFireDatabase} from "@angular/fire/compat/database";


export interface TagsList {
  name: string | number;
}

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})

export class CreateCardComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: TagsList[] = [];

  constructor(public dialogRef: MatDialogRef<CreateCardComponent> ,private fb: FormBuilder , private db: AngularFireDatabase) {}

  createNoteForm = this.fb.group({
    title: ['Title Goes here',Validators.required],
    description: [''],
    tags: [[] as TagsList[]],
  })

  onConfirm(): void {
   this.dialogRef.close(true); // Passes data to the parent if needed
    const noteData = {
      title: this.createNoteForm.value.title,
      description: this.createNoteForm.value.description,
      tags: this.tags.map(tag => tag.name)
    };

    // Save to Firebase Realtime Database
    this.db.list('notes').push(noteData)
      .then(() => {
        console.log('Note added successfully!');
      })
      .catch((error) => {
        console.error('Error adding note: ', error);
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
}

