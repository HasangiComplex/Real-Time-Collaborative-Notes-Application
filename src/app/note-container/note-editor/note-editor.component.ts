import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent{
  editorContent: string = '';
  onContentChange(event: any) {
    this.editorContent = event.target.innerHTML;  // Capture HTML content
    console.log(this.editorContent);  // Process or save content
  }


}
