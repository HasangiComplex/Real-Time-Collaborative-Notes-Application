import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NoteService} from "../services/note-management-service/note.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";


@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent implements OnInit{
  noteId!: string;
  note: any; // To store the retrieved note
  editorContent: string = '';
  tags: any[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

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

      this.tags = note.tags
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
}
