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
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

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
    const mockItemService = jasmine.createSpyObj('ItemService', ['details', 'offer', 'create']);
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

    const description = component.createForm.get('description');
    expect(description?.value).toEqual('some description');
  })

  it('should call onSubmit', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const func = spyOn(component, 'onSubmit');

    fixture.detectChanges();

    form.triggerEventHandler('ngSubmit', null)

    fixture.detectChanges();

    expect(func).toHaveBeenCalled();
  })

  it('should call create when form event fire, then navigate', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const htmlDescription = fixture.nativeElement.querySelector('textarea')
    const htmlPrice = fixture.nativeElement.querySelectorAll('input')[2]
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]
    const htmlCategory = fixture.nativeElement.querySelector('select')
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]
    const page = new Page()

    itemService.create.and.returnValue(of(true))
    fixture.detectChanges()

    htmlTitle.value = 'Title'
    htmlTitle.dispatchEvent(new Event('input'))

    htmlCategory.value = 'estate'
    htmlCategory.dispatchEvent(new Event('change'))

    htmlImg.value = 'https://'
    htmlImg.dispatchEvent(new Event('input'))

    htmlPrice.value = '26'
    htmlPrice.dispatchEvent(new Event('input'))

    htmlDescription.value = 'some description'
    htmlDescription.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    const navArgs = page.navSpy.calls.first().args[0];

    expect(itemService.create).toHaveBeenCalled()
    expect(errorService.cleanErrors).toHaveBeenCalled()
    expect(page.navSpy.calls.any()).withContext('navigate called').toBe(true);
    expect(navArgs[0]).withContext('nav to Home URL').toContain('/item/catalog');
  })

  it('should call getError when form event fire', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const htmlDescription = fixture.nativeElement.querySelector('textarea')
    const htmlPrice = fixture.nativeElement.querySelectorAll('input')[2]
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]
    const htmlCategory = fixture.nativeElement.querySelector('select')
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]

    itemService.create.and.returnValue(throwError(() => new Error()))
    fixture.detectChanges()

    htmlTitle.value = 'Title'
    htmlTitle.dispatchEvent(new Event('input'))

    htmlCategory.value = 'estate'
    htmlCategory.dispatchEvent(new Event('change'))

    htmlImg.value = 'https://'
    htmlImg.dispatchEvent(new Event('input'))

    htmlPrice.value = '26'
    htmlPrice.dispatchEvent(new Event('input'))

    htmlDescription.value = 'some description'
    htmlDescription.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(itemService.create).toHaveBeenCalled()
    expect(errorService.getError).toHaveBeenCalled()
  })

  it('should not to call create when some input is empty', () => {
    const form = fixture.debugElement.query(By.css('form'))
    
    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(itemService.create).not.toHaveBeenCalled()
  })

  it('should not to call create if title lenght is lower than 4 characters', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const htmlDescription = fixture.nativeElement.querySelector('textarea')
    const htmlPrice = fixture.nativeElement.querySelectorAll('input')[2]
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]
    const htmlCategory = fixture.nativeElement.querySelector('select')
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]

    htmlTitle.value = 'Tit'
    htmlTitle.dispatchEvent(new Event('input'))

    htmlCategory.value = 'estate'
    htmlCategory.dispatchEvent(new Event('change'))

    htmlImg.value = 'https://'
    htmlImg.dispatchEvent(new Event('input'))

    htmlPrice.value = '26'
    htmlPrice.dispatchEvent(new Event('input'))

    htmlDescription.value = 'some description'
    htmlDescription.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(itemService.create).not.toHaveBeenCalled()    
  })

  it('should not to call create when category is different from expected ', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const htmlDescription = fixture.nativeElement.querySelector('textarea')
    const htmlPrice = fixture.nativeElement.querySelectorAll('input')[2]
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]
    const category = component.createForm.get('category')
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]

    htmlTitle.value = 'Title'
    htmlTitle.dispatchEvent(new Event('input'))

    category?.setValue('category')
    fixture.detectChanges()

    htmlImg.value = 'https://'
    htmlImg.dispatchEvent(new Event('input'))

    htmlPrice.value = '26'
    htmlPrice.dispatchEvent(new Event('input'))

    htmlDescription.value = 'some description'
    htmlDescription.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(itemService.create).not.toHaveBeenCalled()    
  })

  it('should not to call create when image is different from expected ', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const htmlDescription = fixture.nativeElement.querySelector('textarea')
    const htmlPrice = fixture.nativeElement.querySelectorAll('input')[2]
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]
    const category = component.createForm.get('category')
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]

    htmlTitle.value = 'Title'
    htmlTitle.dispatchEvent(new Event('input'))

    category?.setValue('estate')
    fixture.detectChanges()

    htmlImg.value = 'https//'
    htmlImg.dispatchEvent(new Event('input'))

    htmlPrice.value = '26'
    htmlPrice.dispatchEvent(new Event('input'))

    htmlDescription.value = 'some description'
    htmlDescription.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(itemService.create).not.toHaveBeenCalled()        
  })

  it('should not to call create when price is wrong', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const htmlDescription = fixture.nativeElement.querySelector('textarea')
    const price = component.createForm.get('price')
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]
    const category = component.createForm.get('category')
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]

    htmlTitle.value = 'Title'
    htmlTitle.dispatchEvent(new Event('input'))

    category?.setValue('estate')
    fixture.detectChanges()

    htmlImg.value = 'https://'
    htmlImg.dispatchEvent(new Event('input'))

    price?.setValue('-1')
    fixture.detectChanges()

    htmlDescription.value = 'some description'
    htmlDescription.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(itemService.create).not.toHaveBeenCalled()      
  })

  it('should not to call create when description is biger from allowed', () => {
    const form = fixture.debugElement.query(By.css('form'))
    const htmlDescription = fixture.nativeElement.querySelector('textarea')
    const htmlPrice = fixture.nativeElement.querySelectorAll('input')[2]
    const htmlImg = fixture.nativeElement.querySelectorAll('input')[1]
    const category = component.createForm.get('category')
    const htmlTitle = fixture.nativeElement.querySelectorAll('input')[0]

    htmlTitle.value = 'Title'
    htmlTitle.dispatchEvent(new Event('input'))

    category?.setValue('estate')
    fixture.detectChanges()

    htmlImg.value = 'https://'
    htmlImg.dispatchEvent(new Event('input'))

    htmlPrice.value = '26'
    htmlPrice.dispatchEvent(new Event('input'))

    htmlDescription.value = 'akfejghkjasdhrgklandglkjasdhgjkahgkjahfsjkdghnakjfsngkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjangjknajkngkjanskjgnakjsngkjnsdkfjgnjkndfgjknakjdfgnjkndfgkjanppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp'
    htmlDescription.dispatchEvent(new Event('input'))

    fixture.detectChanges()

    form.triggerEventHandler('ngSubmit', null)
    fixture.detectChanges()

    expect(itemService.create).not.toHaveBeenCalled()      
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
