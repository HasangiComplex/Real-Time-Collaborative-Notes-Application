import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NoteService} from "../services/note-management-service/note.service";
import * as SimplePeer from "simple-peer";


@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit{
  noteId!: string;
  note: any; // To store the retrieved note
  editorContent: string = '';
  peer: SimplePeer.Instance | null = null;

  constructor(private route: ActivatedRoute ,
              private noteService: NoteService ,
              ) {}


  ngOnInit(): void {
    // Access the note id from the route parameters
    this.route.paramMap.subscribe(params => {
      this.noteId = params.get('id') as string;
      // Fetch the note using its id
      this.getNoteById(this.noteId);
    });

  }

  // Fetch the note by id
  getNoteById(id: string): void {
    this.noteService.getNoteById(id).subscribe(note => {
      this.note = note;
      console.log(this.note); // You can use this.note in your template now
    });
  }

  onContentChange(event: any) {
    this.editorContent = event.target.innerHTML;  // Capture HTML content
    console.log(this.editorContent);  // Process or save content
  }


}
