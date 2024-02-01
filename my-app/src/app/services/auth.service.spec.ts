import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule,]
    });

    httpClient = TestBed.inject(HttpClient)
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should return token and should sign user on localStorage', () => {
    const token = 'TOKEN';
    const data = {
      email:'peter@abv.bg',
      password:'123456'
    }

    service.login(data).subscribe({
      next: resToken => expect(resToken).toEqual(token),
      error:fail
    })

    const request = httpTestingController.expectOne('http://localhost:3000/auth/login');
    request.flush(token)
    expect(request.request.method).toBe('POST')

    const localStor = localStorage.getItem('user')
    expect(localStor).toBeTruthy()
  })

  it('register should return token and should sign user on localStorage', () => {
    const token = 'TOKEN';
    const data = {
      email:'peter@abv.bg',
      firstname: 'peter',
      lastname: 'petrov',
      password:'123456',
      repass: '123456',
    }

    service.register(data).subscribe({
      next: resToken => expect(resToken).toEqual(token),
      error:fail
    })

    const request = httpTestingController.expectOne('http://localhost:3000/auth/register');
    request.flush(token)
    expect(request.request.method).toBe('POST')

    const localStor = localStorage.getItem('user')
    expect(localStor).toBeTruthy()
  })

  it('logout()', () => {   
    service.logout().subscribe()

    const request = httpTestingController.expectOne('http://localhost:3000/auth/logout');
    expect(request.request.method).toBe('GET')
  })
});
