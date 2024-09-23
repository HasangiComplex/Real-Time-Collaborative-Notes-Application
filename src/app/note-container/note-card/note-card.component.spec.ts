// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { NoteCardComponent } from './note-card.component';
//
// describe('NoteCardComponent', () => {
//   let component: NoteCardComponent;
//   let fixture: ComponentFixture<NoteCardComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ NoteCardComponent ]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(NoteCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteCardComponent } from './note-card.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NoteService } from '../services/note-management-service/note.service';
import { of } from 'rxjs';
import { DeleteCardComponent } from '../delete-card/delete-card.component';
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

  it('should open the delete dialog', () => {
    component.openDeleteDialog('200ms', '200ms');

    expect(mockDialog.open).toHaveBeenCalledWith(DeleteCardComponent, {
      width: '250px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
  });

  // it('should handle the delete dialog result', () => {
  //   const dialogRefMock = { afterClosed: () => of(true) }; // Mocking the dialog reference
  //   mockDialog.open.and.returnValue(dialogRefMock);
  //
  //   component.addNote(); // This should open the delete dialog
  //
  //   expect(mockDialog.open).toHaveBeenCalledWith(DeleteCardComponent, {
  //     width: '300px',
  //   });
  //
  //   // Simulate closing the dialog
  //   dialogRefMock.afterClosed().subscribe(result => {
  //     expect(result).toBe(true);
  //     console.log('User confirmed:', result); // Ensure this gets logged
  //   });
  // });

  // it('should open share dialog with correct noteId', () => {
  //   const noteId = 'test-note-id';
  //   const dialogRefMock = { afterClosed: () => of(true) };
  //   mockDialog.open.and.returnValue(dialogRefMock);
  //
  //   component.openShareForUserView(noteId);
  //
  //   expect(mockDialog.open).toHaveBeenCalledWith(ShareNoteComponent, {
  //     width: '300px',
  //     data: { noteId: noteId },
  //   });
  //
  //   // Simulate closing the dialog
  //   dialogRefMock.afterClosed().subscribe(result => {
  //     expect(result).toBe(true);
  //     console.log('User confirmed:', result); // Ensure this gets logged
  //   });
  // });
});
