import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NoteService} from "../services/note-management-service/note.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit {
  noteId!: string;
  note: any; // To store the retrieved note
  editorContent: string = '';
  // tags: any[] = [];
  tags: { [key: number]: string } = {};
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private route: ActivatedRoute,
              private noteService: NoteService,
              private auth: AngularFireAuth,
              private router: Router,
              private db: AngularFireDatabase,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.checkAuthorization();

  }

  private checkAuthorization(): void {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
      } else {
        // Access the note id from the route parameters
        this.route.paramMap.subscribe(params => {
          this.noteId = params.get('id') as string;
          // Fetch the note using its id
          this.getNoteById(this.noteId);
        });
      }

    });
  }

  // Fetch the note by id
  getNoteById(id: string): void {
    this.noteService.getNoteById(id).subscribe(note => {
      this.note = note;

      this.tags = note.tags || [];
    });
  }

  onContentChange(event: any) {
    // Capture HTML content
    const htmlContent = event.target.innerHTML;
    // Convert HTML to plain text
    this.editorContent = this.stripHtml(htmlContent);
    // Update local note content
    this.note.description = this.editorContent;
    // Save to Firebase
    this.noteService.updateNoteContent(this.noteId, this.editorContent);
  }

  private stripHtml(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || '';
  }

  goBack() {
    this.router.navigate(['/note-container']);
  }

  updateTitle() {
    if (this.note) {
      // Update the note title in Firebase
      this.db.object(`notes/${this.note.id}`).update({title: this.note.title})
        .then(() => {
          this.showToast('Title updated successfully.', 'success-toast');
        })
        .catch((error) => {
          console.error("Error updating title: ", error);
          this.showToast('Error Occurred! Unable to update title.', 'error-toast');
        });
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value) {
      const index = Object.keys(this.tags).length; // Get the next index
      this.tags[index] = value; // Add the new tag to the object
      this.updateTagsInFirebase(); // Update in Firebase
    }
    // Clear the input
    if (input) {
      input.value = '';
    }
  }

  removeTag(index: string): void {
    // @ts-ignore
    delete this.tags[index]; // Remove the tag from the object
    this.updateTagsInFirebase(); // Update in Firebase
  }

  updateTagsInFirebase(): void {
    if (this.note) {
      this.db.object(`notes/${this.note.id}/tags`).set(this.tags)
        .then(() => {
          this.showToast('Tags updated successfully.', 'success-toast');
        })
        .catch(error => {
          this.showToast('Error Occurred! Unable to update tags.', 'error-toast');
        });
    }
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
