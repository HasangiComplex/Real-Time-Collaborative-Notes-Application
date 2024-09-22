import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";


export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent  {
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  // notes$: Observable<any[]> | undefined;
  //
  // constructor(private db: AngularFireDatabase) { }
  //
  // ngOnInit(): void {
  //   // Retrieve the notes from Firebase
  //   this.notes$ = this.db.list('notes').valueChanges();
  //
  //   console.log("These are the notes:",this.notes$)
  // }
}
