import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteCardComponent} from "../delete-card/delete-card.component";
import {map, Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {NoteService} from "../services/note.service";


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit{
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  notes$: Observable<any[]> | undefined;
  constructor(public dialog: MatDialog , private db: AngularFireDatabase , private noteService: NoteService) {}

  ngOnInit(): void {
    // // Retrieve the notes from Firebase, ensuring that payload is an object
    // this.notes$ = this.db.list('notes').snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => {
    //       const note = c.payload.val();
    //       return { id: c.payload.key, ...(note || {}) }; // Spread only if note is not null
    //     })
    //   )
    // );
    this.notes$ = this.noteService.getNotes(); // Fetch notes from the service
  }

  // // Method to delete a note from Firebase
  // deleteNote(noteId: string): void {
  //   this.db.list('notes').remove(noteId).then(() => {
  //     console.log('Note deleted successfully');
  //   }).catch(error => {
  //     console.error('Error deleting note:', error);
  //   });
  // }
  deleteNote(noteId: string): void {
    this.noteService.deleteNote(noteId).then(() => {
      console.log('Note deleted successfully');
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










}
