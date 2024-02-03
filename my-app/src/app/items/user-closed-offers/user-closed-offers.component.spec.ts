import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserClosedOffersComponent } from './user-closed-offers.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ItemsService } from 'src/app/services/items.service';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('UserClosedOffersComponent', () => {
  let component: UserClosedOffersComponent;
  let fixture: ComponentFixture<UserClosedOffersComponent>;
  let httpClient: HttpClient;
  let itemService: jasmine.SpyObj<ItemsService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let router: Router;
  let location: Location;
  const data = {
    items: [
      {
        bider: null,
        category: "vehicles",
        description: 'some motorcycle description',
        imgUrl: "https://",
        owner: 'peter',
        price: 8314,
        title: "Motorcycle",
        __v: 0,
        _id: '1',
      },
      {
        bider: null,
        category: "other",
        description: 'some horse description',
        imgUrl: "https://",
        owner: 'gosho',
        price: 8314,
        title: "Horse",
        __v: 0,
        _id: '1',
      }
    ]
  }

  beforeEach(waitForAsync(() => {
    const mockItemService = jasmine.createSpyObj('ItemService', ['catalog', 'userClosedOffers']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError']);

    TestBed.configureTestingModule({
      declarations: [UserClosedOffersComponent],

      providers: [
        { provide: ItemsService, useValue: mockItemService },
        { provide: ErrorService, useValue: mockErrorService },
      ],

      imports: [
        HttpClientTestingModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);

    itemService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;

    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;

    router = TestBed.inject(Router);

    location = TestBed.inject(Location);

    itemService.userClosedOffers.and.returnValue(of(data))

    fixture = TestBed.createComponent(UserClosedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoul call getError after userClosedOffers()', () => {
    itemService.userClosedOffers.and.returnValue(throwError(() => new Error()))

    fixture = TestBed.createComponent(UserClosedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(errorService.getError).toHaveBeenCalled()
  })
});
