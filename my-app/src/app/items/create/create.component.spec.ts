import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ErrorService } from 'src/app/services/error.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: ''
})
class DummyComponent {
}

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let httpClient: HttpClient;
  let itemService: jasmine.SpyObj<ItemsService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let router: Router;
  let location: Location;

  beforeEach(waitForAsync(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const mockItemService = jasmine.createSpyObj('ItemService', ['details', 'offer']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError']);

    TestBed.configureTestingModule({
      declarations: [CreateComponent, DummyComponent],

      providers: [
        { provide: ItemsService, useValue: mockItemService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: Router, useValue: routerSpy },
      ],

      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],

      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

  }));

  beforeEach(() => {

    httpClient = TestBed.inject(HttpClient);

    itemService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;

    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;

    router = TestBed.inject(Router);

    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind title', () => {
    const title = component.createForm.get('title')
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]

    title?.setValue('Title')
    fixture.detectChanges()

    expect(htmlTitle.value).toEqual('Title')
  })

  it('should bind title opposite', () => {
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]

    htmlTitle.value = 'Title'
    htmlTitle.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    const title = component.createForm.get('title')
    expect(title?.value).toEqual('Title')
  })

  it('should bind category', () => {
    const category = component.createForm.get('category')
    const htmlCategory = fixture.nativeElement.querySelector('select')

    category?.setValue('estate')
    fixture.detectChanges()

    expect(htmlCategory.value).toEqual('estate')
  })

  it('should bind category opposite', () => {
    const htmlCategory = fixture.nativeElement.querySelector('select')

    htmlCategory.value = 'estate'
    htmlCategory.dispatchEvent(new Event('change'))

    fixture.detectChanges()

    const category = component.createForm.get('category')
    expect(category?.value).toEqual('estate')
  })

  it('should bind image', () => {
    const img = component.createForm.get('imgUrl')
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]

    img?.setValue('https://')

    fixture.detectChanges()

    expect(htmlImg.value).toEqual('https://')
  })

  it('should bind image opposite', () => {
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]

    htmlImg.value = 'https://'
    htmlImg.dispatchEvent(new Event('input'))

    fixture.detectChanges()
    const img = component.createForm.get('imgUrl')
    expect(img?.value).toEqual('https://')
  })

  it('should bind price', () => {
    const price = component.createForm.get('price')
    const htmlPrice = fixture.nativeElement.querySelectorAll('input')[2]
    
    price?.setValue('29')
    fixture.detectChanges()

    expect(htmlPrice.value).toBe('29')
  })

  it('should bind price opposite', () => {
    const htmlPrice = fixture.nativeElement.querySelectorAll('input')[2]

    htmlPrice.value = '26'
    htmlPrice.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    const price = component.createForm.get('price')
    expect(price?.value).toBeTruthy()
  })

  it('should bind description', () => {
    const description = component.createForm.get('description')
    const htmlDescription = fixture.nativeElement.querySelector('textarea')

    description?.setValue('some description')

    fixture.detectChanges()
   
    expect(htmlDescription.value).toBe('some description')
  })

  it('should bind description opposite', () => {
    const htmlDescription = fixture.nativeElement.querySelector('textarea')

    htmlDescription.value = 'some description'
    htmlDescription.dispatchEvent(new Event('input'))

    fixture.detectChanges()
    
    const description = component.createForm.get('description')
    expect(description?.value).toEqual('some description')
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
