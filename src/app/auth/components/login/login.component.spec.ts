
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../../auth-services/authentication.service';
import { LoginComponent } from './login.component';


class MockAuthenticationService {
  signIn(credentials: { email: string, password: string }) {
    return of({}); // Mock successful login
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email field correctly', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('invalid-email');
    expect(email.valid).toBeFalsy();

    email.setValue('valid.email@example.com');
    expect(email.valid).toBeTruthy();
  });

  it('should validate password field as required', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('');
    expect(password.valid).toBeFalsy();

    password.setValue('mypassword');
    expect(password.valid).toBeTruthy();
  });

  it('should call proceedAfterLogin and navigate on successful login', () => {
    spyOn(authenticationService, 'signIn').and.returnValue(of({}));

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.proceedAfterLogin();

    expect(authenticationService.signIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(router.navigate).toHaveBeenCalledWith(['viewNotes']);
  });


});
