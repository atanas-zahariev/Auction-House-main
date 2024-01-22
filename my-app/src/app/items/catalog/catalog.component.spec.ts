import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { CatalogComponent } from './catalog.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ItemsService } from 'src/app/services/items.service';
import { ErrorService } from 'src/app/services/error.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  template: ''
})
class DummyComponent {
}

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let httpClient: HttpClient;
  let itemService: jasmine.SpyObj<ItemsService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let router : Router;
  let location: Location;

  beforeEach(() => {
    const mockItemService = jasmine.createSpyObj('ItemService', ['catalog']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError']);

    TestBed.configureTestingModule({
      declarations: [CatalogComponent,DummyComponent],

      providers: [
        { provide: ItemsService, useValue: mockItemService },
        { provide: ErrorService, useValue: mockErrorService }
      ],

      schemas: [NO_ERRORS_SCHEMA],

      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'action/details/:id', component: DummyComponent }
        ])
      ]
    });

    httpClient = TestBed.inject(HttpClient);

    itemService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;

    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;

    router = TestBed.inject(Router);

    location = TestBed.inject(Location);

    itemService.catalog.and.returnValue(of([]))
    // if we want to check if getError is called -->
    //itemService.catalog.and.returnValue(throwError(() => new Error()))

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(errorService.cleanErrors).toHaveBeenCalled()
    expect(itemService.catalog).toHaveBeenCalled()
  });

  it('check for initial elements', () => {
    const section = fixture.nativeElement.querySelector('#catalog-section')
    const div = fixture.nativeElement.querySelector('.item.pad-large.align-center')
    const p = fixture.nativeElement.querySelector('p')
    const a = fixture.nativeElement.querySelector('a')
    const h1 = fixture.nativeElement.querySelector('h1')

    expect(section).toBeTruthy()
    expect(div).toBeTruthy()
    expect(p.textContent).toEqual('Nothing has been listed yet. Be the first!')
    expect(a.textContent).toEqual('Publish Auction')
    expect(h1.textContent).toEqual('Auctions')
  })

  // if we want to check if getError is called -->

  // it('should call getError', () => {
  //   itemService.catalog.and.returnValue(throwError(() => new Error()))
  //   fixture.detectChanges()
  //   expect(itemService.catalog).toHaveBeenCalled()
  //   expect(errorService.getError).toHaveBeenCalled()
  // })

  it('should create exact same number of li element like ITEMS', () => {
    const ITEMS = [
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

    component.items = ITEMS;
    component.hasLenght = true;
    fixture.detectChanges()

    const liElements = fixture.debugElement.queryAll(By.css('li'))
    const headers = fixture.nativeElement.querySelectorAll('header')
    const h2 = fixture.nativeElement.querySelectorAll('h2')
    const div = fixture.nativeElement.querySelectorAll('div')
    const footer = fixture.nativeElement.querySelector('footer')
    const p = fixture.nativeElement.querySelector('p')
    const img = fixture.nativeElement.querySelectorAll('img')
    const a = fixture.nativeElement.querySelectorAll('a')
    const href = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement.getAttribute('href')
     
    expect(liElements).toBeTruthy()
    expect(liElements.length).toEqual(ITEMS.length)
    expect(headers).toBeTruthy()
    expect(h2).toBeTruthy()
    expect(div).toBeTruthy()
    expect(footer).toBeTruthy()
    expect(p).toBeTruthy()
    expect(img).toBeTruthy()
    expect(a).toBeTruthy()
    expect(href).toEqual('/action/details/1')
  })

  it('should go to url', async () => {
   const page = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement
   console.log(page);
   
   expect(page).toBeTruthy()
  })

});//end
