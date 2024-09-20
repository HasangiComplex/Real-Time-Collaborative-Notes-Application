import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class DocumentServiceService {
  constructor(private db: AngularFireDatabase) {}

  // Get the document content from the Firebase Realtime Database
  getDocument(docId: string) {
    return this.db.object(`documents/${docId}/content`).valueChanges();
  }

  // Update the document content in the Firebase Realtime Database
  updateDocument(docId: string, content: string) {
    return this.db.object(`documents/${docId}`).update({ content });
  }
}
