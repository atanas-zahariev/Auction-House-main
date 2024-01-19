import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url = 'http://localhost:3000/auth'

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http
      .post(`${this.url}/register`, data)
  }

  logout(): Observable<any> {
    return this.http
      .get(`${this.url}/logout`)
  }

  login(data: any): Observable<any> {
    return this.http
      .post(`${this.url}/login`, data)
  }
}
