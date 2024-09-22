import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NoteService} from "../services/note-management-service/note.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit{
  noteId!: string;
  note: any; // To store the retrieved note
  editorContent: string = '';


  constructor(private route: ActivatedRoute ,
              private noteService: NoteService ,
              private auth: AngularFireAuth,
              private router:Router
              ) {}

  ngOnInit(): void {
    this.checkAuthorization();

  }

  private checkAuthorization(): void {
    this.auth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
      }else{
        // Access the note id from the route parameters
        this.route.paramMap.subscribe(params => {
          this.noteId = params.get('id') as string;
          // Fetch the note using its id
          this.getNoteById(this.noteId);
        });
      }
      // Optionally: Add further checks to determine if the user is authorized.
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
    this.note.description = this.editorContent; // Update local note content
    this.noteService.updateNoteContent(this.noteId, this.editorContent); // Save to Firebase
  }

}
