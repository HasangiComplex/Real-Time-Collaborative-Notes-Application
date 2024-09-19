import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateCardComponent} from "./create-card/create-card.component";

@Component({
  selector: 'app-note-container',
  templateUrl: './note-container.component.html',
  styleUrls: ['./note-container.component.scss']
})
export class NoteContainerComponent {
  searchQuery: string = '';

  constructor(private dialog: MatDialog) {}
  addNote(): void {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed:', result);
      }
    });
  }

  onSearch() {
    // Handle the search logic here
    console.log('Search query:', this.searchQuery);
  }


}
