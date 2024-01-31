import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ErrorService } from 'src/app/services/error.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let httpClient: HttpClient;
  let itemService: jasmine.SpyObj<ItemsService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let router: Router;
  let location: Location;
  let activatedRoute: ActivatedRoute;
  let id: any

  const ITEM = {
    bider: null,
    category: "vehicles",
    description: 'some motorcycle description',
    imgUrl: "https://",
    owner: 'peter',
    price: 8314,
    title: "Motorcycle",
    __v: 0,
    _id: '1',
  }

  beforeEach(waitForAsync(() => {
    const mockItemService = jasmine.createSpyObj('ItemService', ['details', 'offer', 'edit']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],

      declarations: [EditComponent],

      providers: [
        { provide: ItemsService, useValue: mockItemService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: ITEM._id } } } },
        { provide: Router, useValue: routerSpy },
      ],

      schemas: [NO_ERRORS_SCHEMA]
    });

  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);

    itemService = TestBed.inject(ItemsService) as jasmine.SpyObj<ItemsService>;

    errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;

    router = TestBed.inject(Router);

    location = TestBed.inject(Location);

    activatedRoute = TestBed.inject(ActivatedRoute);

    itemService.details.and.returnValue(of([]))

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;

    component.editItem(ITEM);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be right properties value to editForm', () => {
    const title = component.editForm.get('title')
    const img = component.editForm.get('imgUrl')
    const category = component.editForm.get('category')
    const price = component.editForm.get('price')
    const description = component.editForm.get('description')

    expect(title?.value).toBe('Motorcycle')
    expect(img?.value).toBe('https://')
    expect(category?.value).toBe('vehicles')
    expect(price?.value).toBe('8314')
    expect(description?.value).toBe('some motorcycle description')
  })

  it('should bind the ITEM to its FormControl', () => {
    const title = fixture.nativeElement.querySelectorAll('input')[0]
    const img = fixture.nativeElement.querySelectorAll('input')[1]
    const price = fixture.nativeElement.querySelectorAll('input')[2]
    const updateButton = fixture.nativeElement.querySelectorAll('input')[3]
    const category = fixture.nativeElement.querySelector('select')
    const description = fixture.nativeElement.querySelector('textarea')

    expect(title.value).toBe('Motorcycle')
    expect(category.value).toBe('vehicles')
    expect(img.value).toBe('https://')
    expect(price.value).toBe('8314')
    expect(updateButton.value).toBe('Update Listing')
    expect(description.value).toBe('some motorcycle description')
  })

  it('should change form inputs values', fakeAsync(() => {
    const title = fixture.nativeElement.querySelectorAll('input')[0]
    const img = fixture.nativeElement.querySelectorAll('input')[1]
    const price = fixture.nativeElement.querySelectorAll('input')[2]
    const category = fixture.nativeElement.querySelector('select')
    const description = fixture.nativeElement.querySelector('textarea')

    const titleValue = 'Motorcycle!!!'
    const imgValue = 'https://12456.jpg'
    const priceValue = '8320'
    const categoryValue = 'furniture'
    const descriptionValue = 'some new motorcycle description'

    title.value = titleValue
    img.value = imgValue
    price.value = priceValue
    category.value = category.options[2].value
    description.value = descriptionValue

    title.dispatchEvent(new Event('input'))
    img.dispatchEvent(new Event('input'))
    price.dispatchEvent(new Event('input'))
    category.dispatchEvent(new Event('change'));
    description.dispatchEvent(new Event('change'));

    tick()
    fixture.detectChanges()

    expect(title.value).toEqual(titleValue)
    expect(img.value).toEqual(imgValue)
    expect(price.value).toEqual(priceValue)
    expect(category.value).toEqual(categoryValue)
    expect(description.value).toEqual(descriptionValue)
  }))

  it('should call onSubmit', fakeAsync(() => {
    const form = fixture.debugElement.query(By.css('form'))
    const func = spyOn(component, 'onSubmit');

    fixture.detectChanges();

    form.triggerEventHandler('ngSubmit', null)
    tick()
    fixture.detectChanges();

    expect(func).toHaveBeenCalled();
  }))

  it('should call edit when form event fires', () => {
    const form = fixture.debugElement.query(By.css('form'))
    itemService.edit.and.returnValue(of(true))

    fixture.detectChanges();

    form.triggerEventHandler('ngSubmit', null)

    fixture.detectChanges();

    expect(errorService.cleanErrors).toHaveBeenCalled();
    expect(itemService.edit).toHaveBeenCalled();
  })

  it('should not to call edit when some input field is empti', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const title = fixture.nativeElement.querySelectorAll('input')[0]
    const titleValue = ''

    title.value = titleValue
    title.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null)

    fixture.detectChanges();

    expect(itemService.edit).not.toHaveBeenCalled()
  })

  it('should navigate after form event fire', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const page = new Page()
    itemService.edit.and.returnValue(of(true))

    fixture.detectChanges();

    form.triggerEventHandler('ngSubmit', null)

    fixture.detectChanges();

    const navArgs = page.navSpy.calls.first().args[0];
    
    expect(errorService.cleanErrors).toHaveBeenCalled()
    expect(page.navSpy.calls.any()).withContext('navigate called').toBe(true);
    expect(navArgs[0]).withContext('nav to Home URL').toContain('/action/details/1');
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
