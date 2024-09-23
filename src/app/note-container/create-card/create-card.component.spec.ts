// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { CreateCardComponent } from './create-card.component';
//
// describe('CreateCardComponent', () => {
//   let component: CreateCardComponent;
//   let fixture: ComponentFixture<CreateCardComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ CreateCardComponent ]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(CreateCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCardComponent } from './create-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NoteService } from '../services/note-management-service/note.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../states/auth.reducer';
import {Observable, of} from 'rxjs';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;
  let fixture: ComponentFixture<CreateCardComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateCardComponent>>;
  let mockNoteService: jasmine.SpyObj<NoteService>;
  let mockStore: jasmine.SpyObj<Store<AuthState>>;
  let mockUserId$: Observable<string | null>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockNoteService = jasmine.createSpyObj('NoteService', ['createNote']);
    mockUserId$ = of('test-user-id');
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockStore.select.and.returnValue(mockUserId$);

    await TestBed.configureTestingModule({
      declarations: [CreateCardComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: AngularFireDatabase, useValue: {} },
        { provide: NoteService, useValue: mockNoteService },
        { provide: Store, useValue: mockStore },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.createNoteForm.get('title')?.value).toBe('Title Goes here');
    expect(component.createNoteForm.get('description')?.value).toBe('');
    expect(component.createNoteForm.get('tags')?.value).toEqual([]);
  });

  it('should subscribe to userId$ on ngOnInit', () => {
    spyOn(console, 'log');
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('The login user', mockUserId$);
  });

  it('should create a note on confirm', () => {
    component.createNoteForm.setValue({
      title: 'Test Note',
      description: 'This is a test note',
      tags: []
    });

    component.tags = [{ name: 'tag1' }, { name: 'tag2' }];

    component.onConfirm();

    expect(mockNoteService.createNote).toHaveBeenCalledWith({
      title: 'Test Note',
      description: 'This is a test note',
      tags: ['tag1', 'tag2'],
      created_user: 'test-user-id',
      shared_users: []
    });

    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should add a tag', () => {
    const event: MatChipInputEvent = { value: 'new tag', chipInput: { clear: () => {} } } as MatChipInputEvent;

    component.addTag(event);

    expect(component.tags.length).toBe(1);
    expect(component.tags[0].name).toBe('new tag');
    expect(component.createNoteForm.get('tags')?.value).toEqual([{ name: 'new tag' }]);
  });

  it('should remove a tag', () => {
    component.tags = [{ name: 'tag1' }, { name: 'tag2' }];

    component.removeTag({ name: 'tag1' });

    expect(component.tags.length).toBe(1);
    expect(component.tags[0].name).toBe('tag2');
    expect(component.createNoteForm.get('tags')?.value).toEqual([{ name: 'tag2' }]);
  });

  it('should edit a tag', () => {
    component.tags = [{ name: 'tag1' }];
    const event: MatChipEditedEvent = { value: 'edited tag' } as MatChipEditedEvent;

    component.editTag(component.tags[0], event);

    expect(component.tags[0].name).toBe('edited tag');
    expect(component.createNoteForm.get('tags')?.value).toEqual([{ name: 'edited tag' }]);
  });

  it('should remove tag when editing an empty value', () => {
    component.tags = [{ name: 'tag1' }];
    const event: MatChipEditedEvent = { value: '' } as MatChipEditedEvent;

    component.editTag(component.tags[0], event);

    expect(component.tags.length).toBe(0);
    expect(component.createNoteForm.get('tags')?.value).toEqual([]);
  });
});
