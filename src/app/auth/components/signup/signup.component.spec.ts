// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { SignupComponent } from './signup.component';
//
// describe('SignupComponent', () => {
//   let component: SignupComponent;
//   let fixture: ComponentFixture<SignupComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ SignupComponent ]
//     })
//     .compileComponents();
//
//     fixture = TestBed.createComponent(SignupComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { AuthenticationService } from '../../auth-services/authentication.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthenticationService = jasmine.createSpyObj('AuthenticationService', ['signUp']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: AuthenticationService, useValue: mockAuthenticationService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the form initialized with default values', () => {
    const registerForm = component.registerForm;
    expect(registerForm.get('username')?.value).toBe('');
    expect(registerForm.get('password')?.value).toBe('');
    expect(registerForm.get('email')?.value).toBe('');
  });

  it('should call the authentication service on valid form submission', () => {
    // Set valid form values
    component.registerForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    component.proceedAfterSignUp();

    expect(mockAuthenticationService.signUp).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should not call the authentication service if the form is invalid', () => {
    // Set invalid form values
    component.registerForm.setValue({
      username: 'testuser',
      email: 'invalid-email', // invalid email
      password: ''
    });

    component.proceedAfterSignUp();

    expect(mockAuthenticationService.signUp).not.toHaveBeenCalled();
  });

  it('should navigate to login page when backToLogin is called', () => {
    component.backToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  // it('should navigate to viewNotes page after form submission', () => {
  //   spyOn(console, 'log'); // To prevent logging during the test
  //   component.registerForm.setValue({
  //     username: 'testuser',
  //     email: 'test@example.com',
  //     password: 'password123'
  //   });
  //
  //   component.onSubmitForSignup();
  //
  //   expect(console.log).toHaveBeenCalledWith('Form sent successfully ', component.registerForm.value);
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['viewNotes']);
  // });
});
