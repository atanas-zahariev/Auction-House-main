import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let httpClient: HttpClient;
  let router : Router

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'logout']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError'])

    TestBed.configureTestingModule({
      declarations: [LogoutComponent],

      imports: [
        HttpClientTestingModule,
      ],

      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: Router, useValue: routerSpy },
      ]
    });

    httpClient = TestBed.inject(HttpClient);

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
     
    authService.logout.and.returnValue(of(true))

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(authService.logout).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalled()
  });

  it('should call getError after logout()', () => {
    authService.logout.and.returnValue(throwError(() => new Error()))

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    expect(errorService.getError).toHaveBeenCalled()
  })
});
