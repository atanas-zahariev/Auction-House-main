import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClosedOffersComponent } from './user-closed-offers.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

describe('UserClosedOffersComponent', () => {
  let component: UserClosedOffersComponent;
  let fixture: ComponentFixture<UserClosedOffersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserClosedOffersComponent],
      providers:[HttpClient,HttpHandler]
    });
    fixture = TestBed.createComponent(UserClosedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
