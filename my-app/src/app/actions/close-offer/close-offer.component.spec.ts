import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
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
  let activatedRoute: ActivatedRoute;
  let id: any
  let page: Page

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

    activatedRoute = TestBed.inject(ActivatedRoute);

    itemService.closeOffer.and.returnValue(of(true));

    fixture = TestBed.createComponent(CloseOfferComponent);

    component = fixture.componentInstance;

    page = new Page()

    fixture.detectChanges();
  })

  it('should create and navigate', () => {
    const navArgs = page.navSpy.calls.first().args[0];

    expect(component).toBeTruthy();
    expect(router.navigate).toHaveBeenCalled()
    expect(navArgs[0]).withContext('nav to UserClosedOffers URL').toContain('/item/closed');
  });

  it('should call getError', () => {
    itemService.closeOffer.and.returnValue(throwError(() => new Error()));

    fixture = TestBed.createComponent(CloseOfferComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
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

});
