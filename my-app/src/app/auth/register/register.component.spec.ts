import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { RegisterComponent } from './register.component';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let httpClient: HttpClient

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const mockAuthService = jasmine.createSpyObj('AuthService', ['register']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],

      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: routerSpy },
      ],

      schemas: [NO_ERRORS_SCHEMA],

      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    });

    httpClient = TestBed.inject(HttpClient);

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form element', () => {
    const form = fixture.debugElement.query(By.css('form'))
    expect(form).toBeTruthy();
  })

  it('should have email, first name, last name,password, repas and button', () => {
    const email = fixture.debugElement.queryAll(By.css('input'))[0];
    const firstName = fixture.debugElement.queryAll(By.css('input'))[1];
    const lastName = fixture.debugElement.queryAll(By.css('input'))[2];
    const password = fixture.debugElement.queryAll(By.css('input'))[3];
    const repass = fixture.debugElement.queryAll(By.css('input'))[4];
    const button = fixture.debugElement.query(By.css('button'));

    expect(email).toBeTruthy();
    expect(firstName).toBeTruthy();
    expect(lastName).toBeTruthy();
    expect(password).toBeTruthy();
    expect(repass).toBeTruthy();
    expect(button).toBeTruthy();
  })

  it('should change inputs value', fakeAsync(() => {
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const firstName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const lastName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[2];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[3];
    const repass: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[4];

    email.value = 'edy@abv.bg';
    firstName.value = 'edy';
    lastName.value = 'koisi';
    password.value = '123456';
    repass.value = '123456';

    email.dispatchEvent(new Event('input'));
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    repass.dispatchEvent(new Event('input'));

    tick()
    fixture.detectChanges();

    expect(email.value).toEqual('edy@abv.bg');
    expect(firstName.value).toEqual('edy');
    expect(lastName.value).toEqual('koisi');
    expect(password.value).toEqual('123456');
    expect(repass.value).toEqual('123456');
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

  it('should call register when form fire event', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const firstName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const lastName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[2];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[3];
    const repass: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[4];

    authService.register.and.returnValue(of(true));

    email.value = 'edy@abv.bg';
    firstName.value = 'edy';
    lastName.value = 'koisi';
    password.value = '123456';
    repass.value = '123456';

    email.dispatchEvent(new Event('input'));
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    repass.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit',null);
    fixture.detectChanges()

    expect(authService.register).toHaveBeenCalled()
  })

  it('should not to call register when form fire event with wrong input', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const firstName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const lastName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[2];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[3];
    const repass: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[4];
    
    authService.register.and.returnValue(of(true));

    email.value = '';
    firstName.value = '';
    lastName.value = '';
    password.value = '';
    repass.value = '';

    email.dispatchEvent(new Event('input'));
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    repass.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit',null);
    fixture.detectChanges()

    expect(authService.register).not.toHaveBeenCalled()
  })

  it('should navigate when form fire event', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const email: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[0];
    const firstName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[1];
    const lastName: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[2];
    const password: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[3];
    const repass: HTMLInputElement = fixture.nativeElement.querySelectorAll('input')[4];
    const page = new Page()
    
    authService.register.and.returnValue(of(true));

    email.value = 'edy@abv.bg';
    firstName.value = 'edy';
    lastName.value = 'koisi';
    password.value = '123456';
    repass.value = '123456';

    email.dispatchEvent(new Event('input'));
    firstName.dispatchEvent(new Event('input'));
    lastName.dispatchEvent(new Event('input'));
    password.dispatchEvent(new Event('input'));
    repass.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit',null);
    fixture.detectChanges()

    const navArgs = page.navSpy.calls.first().args[0];

    expect(page.navSpy.calls.any()).withContext('navigate called').toBe(true);
    expect(navArgs[0]).withContext('nav to heroes detail URL').toContain('/');
  })

  ///Helper
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
