import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DeleteCardComponent} from "../delete-card/delete-card.component";
import {map, Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {NoteService} from "../services/note-management-service/note.service";
import {ShareNoteComponent} from "../share-note/share-note.component";
import {FilterByTagPipe} from "../../pipes/filter-by-tag.pipe";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateCardComponent} from "../create-card/create-card.component";


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit{
  @Input() searchQuery: string = '';
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  notes$: Observable<any[]> | undefined;
  constructor(public dialog: MatDialog ,
              private db: AngularFireDatabase ,
              private noteService: NoteService,
              private snackBar: MatSnackBar,


  ) {}

  ngOnInit(): void {
    this.notes$ = this.noteService.getNotes(); // Fetch notes from the service
  }

  deleteNote(noteId: string): void {
    this.noteService.deleteNote(noteId) .then(() => {
      this.showToast('Note deleted successfully.', 'success-toast');
    })
      .catch((error) => {
        this.showToast('Error Occurred! Unable to delete.', 'error-toast');
      });
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteCardComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  addNote(): void {
    console.log("clicked delete")
    const dialogRef = this.dialog.open(DeleteCardComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed:', result);
      }
    });
  }


  openShareForUserView(noteId: string) {
    const dialogRef = this.dialog.open(ShareNoteComponent, {
      width: '300px',
      data: { noteId: noteId } // Passing the noteId as data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed:', result);
      }
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
