// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { NoteEditorComponent } from './note-editor.component';
//
// describe('NoteEditorComponent', () => {
//   let component: NoteEditorComponent;
//   let fixture: ComponentFixture<NoteEditorComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ NoteEditorComponent ]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(NoteEditorComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NoteEditorComponent } from './note-editor.component';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NoteService } from '../services/note-management-service/note.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { of } from 'rxjs';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
//
// describe('NoteEditorComponent', () => {
//   let component: NoteEditorComponent;
//   let fixture: ComponentFixture<NoteEditorComponent>;
//   let mockActivatedRoute: any;
//   let mockNoteService: jasmine.SpyObj<NoteService>;
//   let mockAuth: jasmine.SpyObj<AngularFireAuth>;
//   let mockRouter: jasmine.SpyObj<Router>;
//
//   beforeEach(async () => {
//     mockActivatedRoute = {
//       paramMap: of({ get: (key: string) => 'test-note-id' }) // Mocking route parameter
//     };
//
//     mockNoteService = jasmine.createSpyObj('NoteService', ['getNoteById', 'updateNoteContent']);
//     mockAuth = jasmine.createSpyObj('AngularFireAuth', ['authState']);
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);
//
//     await TestBed.configureTestingModule({
//       declarations: [NoteEditorComponent],
//       providers: [
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: NoteService, useValue: mockNoteService },
//         { provide: AngularFireAuth, useValue: mockAuth },
//         { provide: Router, useValue: mockRouter }
//       ],
//       schemas: [NO_ERRORS_SCHEMA] // Ignore unknown components in template
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(NoteEditorComponent);
//     component = fixture.componentInstance;
//     // mockAuth.authState.and.returnValue(of(null)); // Simulating an unauthenticated user
//     fixture.detectChanges();
//   });
//
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should navigate to login if user is not authenticated', () => {
//     component.ngOnInit();
//
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
//   });
//
//   // it('should fetch note by id if user is authenticated', () => {
//   //   const mockUser = { uid: 'test-user-id' };
//   //   mockAuth.authState.and.returnValue(of(mockUser)); // Simulating an authenticated user
//   //
//   //   component.ngOnInit();
//   //
//   //   expect(mockRouter.navigate).not.toHaveBeenCalled(); // Ensure we don't navigate to login
//   //   expect(mockActivatedRoute.paramMap.subscribe).toHaveBeenCalled();
//   //   component.checkAuthorization(); // Ensure that note retrieval is called
//   //   expect(mockNoteService.getNoteById).toHaveBeenCalledWith('test-note-id');
//   // });
//
//   it('should retrieve note and set tags when getNoteById is called', () => {
//     const mockNote = { tags: ['tag1', 'tag2'] };
//     mockNoteService.getNoteById.and.returnValue(of(mockNote));
//
//     component.getNoteById('test-note-id');
//
//     expect(component.note).toEqual(mockNote);
//     expect(component.tags).toEqual(mockNote.tags);
//   });
//
//   it('should update note content when onContentChange is called', () => {
//     const mockEvent = { target: { innerHTML: 'New content' } };
//     const mockNote = { description: '' };
//     component.note = mockNote;
//     component.noteId = 'test-note-id';
//
//     component.onContentChange(mockEvent);
//
//     expect(component.editorContent).toBe('New content');
//     expect(component.note.description).toBe('New content');
//     expect(mockNoteService.updateNoteContent).toHaveBeenCalledWith('test-note-id', 'New content');
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteEditorComponent } from './note-editor.component';

import{NoteService} from "../services/note-management-service/note.service";
import {AuthenticationService} from "../../auth/auth-services/authentication.service";

import { of } from 'rxjs';
import {ActivatedRoute} from "@angular/router";

class MockAuthService {
  authState = of({ uid: 'testUserId' }); // Mocked auth state
}

class MockNoteService {
  getNoteById(id: string) {
    return of({ id: 'note1', tags: ['tag1', 'tag2'] }); // Mocked note
  }
}

describe('NoteEditorComponent', () => {
  let component: NoteEditorComponent;
  let fixture: ComponentFixture<NoteEditorComponent>;
  let noteService: MockNoteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteEditorComponent],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthService },
        { provide: NoteService, useClass: MockNoteService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }), // Mock the route parameters as needed
          },
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditorComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService);
  });

  it('should retrieve note and set tags when getNoteById is called', () => {
    const noteId = 'note1';
    spyOn(noteService, 'getNoteById').and.callThrough(); // Allow the mocked method to be called

    component.getNoteById(noteId); // Call the method to test
    fixture.detectChanges(); // Trigger change detection

    expect(noteService.getNoteById).toHaveBeenCalledWith(noteId);
    expect(component.note).toEqual({ id: 'note1', tags: ['tag1', 'tag2'] });
    expect(component.tags).toEqual(['tag1', 'tag2']);
  });
});
