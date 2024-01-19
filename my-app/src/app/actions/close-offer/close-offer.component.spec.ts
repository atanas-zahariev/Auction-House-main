import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOfferComponent } from './close-offer.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CloseOfferComponent', () => {
  let component: CloseOfferComponent;
  let fixture: ComponentFixture<CloseOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [CloseOfferComponent],
      providers:[HttpClient,HttpHandler,RouterTestingModule]
    });
    fixture = TestBed.createComponent(CloseOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
