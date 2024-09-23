// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { ShareNoteComponent } from './share-note.component';
//
// describe('ShareNoteComponent', () => {
//   let component: ShareNoteComponent;
//   let fixture: ComponentFixture<ShareNoteComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ShareNoteComponent ]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(ShareNoteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareNoteComponent } from './share-note.component';
import { FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorizedUserService } from '../services/user-management-service/authorized-user.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from '../note-interfaces/user';

describe('ShareNoteComponent', () => {
  let component: ShareNoteComponent;
  let fixture: ComponentFixture<ShareNoteComponent>;
  let mockAuthorizedUserService: jasmine.SpyObj<AuthorizedUserService>;
  let mockDb: jasmine.SpyObj<AngularFireDatabase>;
  let mockNoteId = 'test-note-id';

  beforeEach(async () => {
    mockAuthorizedUserService = jasmine.createSpyObj('AuthorizedUserService', ['getAuthorizedUsers']);
    mockDb = jasmine.createSpyObj('AngularFireDatabase', ['object']);

    await TestBed.configureTestingModule({
      declarations: [ShareNoteComponent],
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: AngularFireDatabase, useValue: mockDb },
        { provide: MAT_DIALOG_DATA, useValue: { noteId: mockNoteId } },
        { provide: AuthorizedUserService, useValue: mockAuthorizedUserService }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown components in template
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareNoteComponent);
    component = fixture.componentInstance;

    // // Mocking authorized users with required properties
    // const mockUsers: { id: string | null; userData: User }[] = [
    //   { id: '1', userData: { id: '1', name: 'User 1', email: 'user1@example.com' } },
    //   { id: '2', userData: { id: '2', name: 'User 2', email: 'user2@example.com' } }
    // ];

    // mockAuthorizedUserService.getAuthorizedUsers.and.returnValue(of(mockUsers));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.shareNoteForm).toBeDefined();
    expect(component.shareNoteForm.get('selectedUsers')).toBeTruthy();
  });

  // it('should fetch authorized users on initialization', () => {
  //   component.ngOnInit();
  //   expect(mockAuthorizedUserService.getAuthorizedUsers).toHaveBeenCalled();
  //   expect(component.authorizedUserList.length).toBe(2);
  //   expect(component.authorizedUserList[0].userData.name).toBe('User 1');
  // });
  //
  // it('should share note with selected users', () => {
  //   const mockSelectedUsers = ['1', '2'];
  //   component.shareNoteForm.get('selectedUsers')?.setValue(mockSelectedUsers);
  //
  //   const mockNoteRef = { update: jasmine.createSpy('update').and.returnValue(Promise.resolve()) };
  //   mockDb.object.and.returnValue(mockNoteRef);
  //
  //   component.shareForUser();
  //
  //   expect(mockDb.object).toHaveBeenCalledWith(`/notes/${mockNoteId}`);
  //   expect(mockNoteRef.update).toHaveBeenCalledWith({ shared_users: mockSelectedUsers });
  // });

  // it('should handle error when sharing note fails', async () => {
  //   const mockSelectedUsers = ['1', '2'];
  //   component.shareNoteForm.get('selectedUsers')?.setValue(mockSelectedUsers);
  //
  //   const mockNoteRef = { update: jasmine.createSpy('update').and.returnValue(Promise.reject('Error updating')) };
  //   mockDb.object.and.returnValue(mockNoteRef);
  //
  //   await component.shareForUser();
  //
  //   expect(mockDb.object).toHaveBeenCalledWith(`/notes/${mockNoteId}`);
  //   expect(mockNoteRef.update).toHaveBeenCalledWith({ shared_users: mockSelectedUsers });
  // });
});
