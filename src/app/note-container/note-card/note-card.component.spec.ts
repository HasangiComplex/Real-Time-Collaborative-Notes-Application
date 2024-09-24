
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteCardComponent } from './note-card.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NoteService } from '../services/note-management-service/note.service';
import { of } from 'rxjs';
import { ShareNoteComponent } from '../share-note/share-note.component';

describe('NoteCardComponent', () => {
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockNoteService: jasmine.SpyObj<NoteService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockNoteService = jasmine.createSpyObj('NoteService', ['getNotes', 'deleteNote']);

    await TestBed.configureTestingModule({
      declarations: [NoteCardComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: AngularFireDatabase, useValue: {} },
        { provide: NoteService, useValue: mockNoteService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCardComponent);
    component = fixture.componentInstance;
    mockNoteService.getNotes.and.returnValue(of([])); // Mocking getNotes to return an observable
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notes on initialization', () => {
    component.ngOnInit();
    expect(mockNoteService.getNotes).toHaveBeenCalled();
    expect(component.notes$).toBeDefined();
  });

  it('should delete a note', () => {
    const noteId = 'test-note-id';
    mockNoteService.deleteNote.and.returnValue(Promise.resolve());

    component.deleteNote(noteId);

    expect(mockNoteService.deleteNote).toHaveBeenCalledWith(noteId);
  });



});
