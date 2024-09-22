import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteCardComponent} from "../delete-card/delete-card.component";
import {map, Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {NoteService} from "../services/note-management-service/note.service";


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
    this.notes$ = this.noteService.getNotes(); // Fetch notes from the service
  }

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
