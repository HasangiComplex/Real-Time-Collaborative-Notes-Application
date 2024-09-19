import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteCardComponent} from "../delete-card/delete-card.component";


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;

  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  constructor(public dialog: MatDialog) {}

  deleteNote() {
    window.confirm(
      'Are you sure you want to delete this note?'
    ) && this.delete.emit();
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
