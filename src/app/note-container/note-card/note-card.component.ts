import {Component, EventEmitter, Output} from '@angular/core';

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

  deleteNote() {
    window.confirm(
      'Are you sure you want to delete this note?'
    ) && this.delete.emit();
  }
}
