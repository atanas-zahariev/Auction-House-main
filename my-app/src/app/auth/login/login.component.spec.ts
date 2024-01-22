import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let httpClient: HttpClient;

  @NgModule()
  class FixNavigationTriggeredOutsideAngularZoneNgModule {
    constructor(_router: Router) {
    }
  }

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError'])
    TestBed.configureTestingModule({

      declarations: [LoginComponent],

      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        // FixNavigationTriggeredOutsideAngularZoneNgModule
      ],

      schemas: [NO_ERRORS_SCHEMA],

      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: Router, useValue: routerSpy },
      ]
    });


    httpClient = TestBed.inject(HttpClient);

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy()
  })

  it('should have email input inside form', () => {
    const email = fixture.nativeElement.querySelectorAll('input')[0];
    expect(email).toBeTruthy()
  })

  it('should have password input inside form', () => {
    const password = fixture.nativeElement.querySelectorAll('input')[1];
    expect(password).toBeTruthy()
  })

  it('should have submit input inside form', () => {
    const button = fixture.nativeElement.querySelectorAll('input')[2];
    expect(button).toBeTruthy()
  })

  it('should  change email and password values', fakeAsync(() => {
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const emailValue = 'peter@abv.bg'
    const passwordValue = '123456'

    email.value = emailValue;
    password.value = passwordValue;

    email.dispatchEvent(new Event('input'))
    password.dispatchEvent(new Event('input'))

    tick()
    fixture.detectChanges();

    expect(email.value).toEqual(emailValue)
    expect(password.value).toEqual(passwordValue)
  }))

  it('should  call onSubmit ', fakeAsync(() => {
    const form = fixture.debugElement.query(By.css('form'))
    const func = spyOn(component, 'onSubmit');

    fixture.detectChanges();

    form.triggerEventHandler('ngSubmit', null)
    tick()
    fixture.detectChanges();

    expect(func).toHaveBeenCalled();
  }))

  it('should call login when form event fire', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const emailValue = 'peter@abv.bg'
    const passwordValue = '123456'

    fixture.detectChanges()
    authService.login.and.returnValue(of(true))

    email.value = emailValue;
    password.value = passwordValue;

    email.dispatchEvent(new Event('input'))
    password.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(authService.login).toHaveBeenCalled()
    expect(errorService.cleanErrors).toHaveBeenCalled()
  })

  it('should not to call login when form event fire', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const emailValue = ''
    const passwordValue = ''

    fixture.detectChanges()
    authService.login.and.returnValue(of(true))

    email.value = emailValue;
    password.value = passwordValue;

    email.dispatchEvent(new Event('input'))
    password.dispatchEvent(new Event('input'))

    fixture.detectChanges()
    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(authService.login).not.toHaveBeenCalled()
  })

  it('should navigate after form event fire', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const emailValue = 'peter@abv.bg'
    const passwordValue = '123456'
    const page = new Page()

    fixture.detectChanges()
    authService.login.and.returnValue(of(true))

    email.value = emailValue;
    password.value = passwordValue;

    email.dispatchEvent(new Event('input'))
    password.dispatchEvent(new Event('input'))

    fixture.detectChanges()
    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    const navArgs = page.navSpy.calls.first().args[0];

    expect(errorService.cleanErrors).toHaveBeenCalled()
    expect(page.navSpy.calls.any()).withContext('navigate called').toBe(true);
    expect(navArgs[0]).withContext('nav to Home URL').toContain('/');
  })

  it('should call getError when error happens with login', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const emailValue = 'peterabv.bg'
    const passwordValue = '123456'
    
    fixture.detectChanges()
    authService.login.and.returnValue(throwError(() => new Error()))

    email.value = emailValue;
    password.value = passwordValue;

    email.dispatchEvent(new Event('input'))
    password.dispatchEvent(new Event('input'))
    
    fixture.detectChanges()
    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(errorService.getError).toHaveBeenCalled()
  })

  class Page {
    /** Spy on router navigate method */
    navSpy: jasmine.Spy;

    constructor() {
      // Get the component's injected router navigation spy
      const routerSpy = fixture.debugElement.injector.get(Router);
      this.navSpy = routerSpy.navigate as jasmine.Spy;
    }
  }

});//end