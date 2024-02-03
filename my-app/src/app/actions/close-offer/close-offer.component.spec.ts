import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CloseOfferComponent } from './close-offer.component';
import { ItemsService } from 'src/app/services/items.service';
import { ErrorService } from 'src/app/services/error.service';
import { of, throwError } from 'rxjs';


describe('CloseOfferComponent', () => {
  let component: CloseOfferComponent;
  let fixture: ComponentFixture<CloseOfferComponent>;
  let httpClient: HttpClient;
  let itemService: jasmine.SpyObj<ItemsService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let router: Router;
  let location: Location;
  let activatedRoute: ActivatedRoute;
  let id: any
  let navArgs: any

  beforeEach(waitForAsync(() => {
    const mockItemService = jasmine.createSpyObj('ItemService', ['details', 'offer', 'closeOffer']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({

      declarations: [CloseOfferComponent],
      providers: [
        { provide: ItemsService, useValue: mockItemService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } },
        { provide: Router, useValue: routerSpy },
      ],

      schemas: [NO_ERRORS_SCHEMA],

      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents();

  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);

    itemService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;

    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;

    router = TestBed.inject(Router);

    location = TestBed.inject(Location);

    activatedRoute = TestBed.inject(ActivatedRoute);

    itemService.closeOffer.and.returnValue(of(true));

    fixture = TestBed.createComponent(CloseOfferComponent);

    component = fixture.componentInstance;
    
    fixture.detectChanges();
  })

  it('should create and navigate', () => {
    expect(component).toBeTruthy();
    expect(router.navigate).toHaveBeenCalled()
  });

  it('should call getError', () => {
    itemService.closeOffer.and.returnValue(throwError(() => new Error()));

    fixture = TestBed.createComponent(CloseOfferComponent);

    component = fixture.componentInstance;
    
    fixture.detectChanges();

    expect(errorService.getError).toHaveBeenCalled()
  })

});
