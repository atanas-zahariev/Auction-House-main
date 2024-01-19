import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  url = 'http://localhost:3000/house'


  constructor(private http: HttpClient) { }


  catalog(): Observable<any> {
    return this.http.get(`${this.url}/catalog`)
  }

  details(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/details/${id}`)
  }

  offer(id: string, data: any): Observable<any> {
    return this.http
      .post(`${this.url}/details/${id}`, data)
  }

  closeOffer(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/userAction/${id}`)
  }

  userClosedOffers(): Observable<any> {
    return this.http
      .get(`${this.url}/closed`)
  }

  create(data: any): Observable<any> {
    return this.http
      .post(`${this.url}/create`, data)
  }

  edit(data: any, id: string): Observable<any> {
    return this.http
      .post(`${this.url}/edit/${id}`, data)
  }

  delete(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/delete/${id}`)
  }

}
