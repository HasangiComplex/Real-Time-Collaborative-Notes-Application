import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {StoreModule} from "@ngrx/store";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('NoteService', () => {
  let service: NoteService;
  let mockDb: jasmine.SpyObj<AngularFireDatabase>;

  beforeEach(() => {
    mockDb = jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),MatSnackBarModule], // Import StoreModule
      providers: [
        NoteService,
        { provide: AngularFireDatabase, useValue: mockDb },
        // Mock Store if needed
      ]
    });

    service = TestBed.inject(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
