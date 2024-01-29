import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import { DetailsComponent } from './details.component';
import { ItemsService } from 'src/app/services/items.service';
import { ErrorService } from 'src/app/services/error.service';

import { from, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: ''
})
class DummyComponent {
}

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let httpClient: HttpClient;
  let itemService: jasmine.SpyObj<ItemsService>;
  let errorService: jasmine.SpyObj<ErrorService>;
  let router: Router;
  let location: Location;
  let activatedRoute: ActivatedRoute;
  let id: any

  beforeEach(waitForAsync(() => {
    const mockItemService = jasmine.createSpyObj('ItemService', ['details', 'offer']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError']);

    TestBed.configureTestingModule({
      declarations: [DetailsComponent, DummyComponent],

      providers: [
        { provide: ItemsService, useValue: mockItemService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: [id] } } },
      ],

      schemas: [NO_ERRORS_SCHEMA],

      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'action/edit/:id', component: DummyComponent },
          { path: 'action/delete/:id', component: DummyComponent },
          { path: 'action/userAction/:id', component: DummyComponent },
        ]),
        ReactiveFormsModule,
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

    itemService.details.and.returnValue(of([]))

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;

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
   

    component.item = ITEM;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getError', () => {
    itemService.details.and.returnValue(throwError(() => new Error()))

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(itemService.details).toHaveBeenCalled()
    expect(errorService.getError).toHaveBeenCalled()
  })

  it('should render notOwner template without user', () => {
    component.userFirstName = 'Peter'
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('#catalog-section')
    const h1 = fixture.nativeElement.querySelector('h1')
    const img = fixture.debugElement.queryAll(By.css('img'))[0].nativeElement.getAttribute('src')
    const strong = fixture.nativeElement.querySelector('strong')
    const pDescription = fixture.nativeElement.querySelectorAll('p')[1]
    const divPrice = fixture.nativeElement.querySelector('.align-center div')
    const footer = fixture.nativeElement.querySelector('footer')

    expect(section).toBeTruthy()
    expect(h1.textContent).toBe(' Motorcycle ')
    expect(img).toEqual('https://')
    expect(strong.textContent).toBe('vehicles')
    expect(pDescription.textContent).toBe('some motorcycle description')
    expect(divPrice.textContent).toBe(' Current price: $8314')
    expect(footer.textContent).toBe('Listed by Peter ')
  })

  it('should render notOwner template with user whose offer is hire', () => {
    component.user = true;
    component.currentHigherOffer = true;
    component.userFirstName = 'Peter'
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('#catalog-section')
    const h1 = fixture.nativeElement.querySelector('h1')
    const img = fixture.debugElement.queryAll(By.css('img'))[0].nativeElement.getAttribute('src')
    const strong = fixture.nativeElement.querySelector('strong')
    const pDescription = fixture.nativeElement.querySelectorAll('p')[1]
    const divPrice = fixture.nativeElement.querySelector('.align-center div')
    const divForHighestBidder = fixture.nativeElement.querySelectorAll('.align-center div')[1]
    const footer = fixture.nativeElement.querySelector('footer')

    expect(section).toBeTruthy()
    expect(h1.textContent).toBe(' Motorcycle ')
    expect(img).toEqual('https://')
    expect(strong.textContent).toBe('vehicles')
    expect(pDescription.textContent).toBe('some motorcycle description')
    expect(divPrice.textContent).toBe(' Current price: $8314')
    expect(divForHighestBidder.textContent).toBe(' You are currently the highest bidder for this auction ')
    expect(footer.textContent).toBe('Listed by Peter ')
  })

  it('should render notOwner template with user', () => {
    component.user = true;
    component.userFirstName = 'Peter'
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('#catalog-section')
    const h1 = fixture.nativeElement.querySelector('h1')
    const img = fixture.debugElement.queryAll(By.css('img'))[0].nativeElement.getAttribute('src')
    const strong = fixture.nativeElement.querySelector('strong')
    const pDescription = fixture.nativeElement.querySelectorAll('p')[1]
    const divPrice = fixture.nativeElement.querySelector('.align-center div')
    const form = fixture.nativeElement.querySelector('form')
    const priceInput = fixture.nativeElement.querySelectorAll('form input')[0]
    const submitInput = fixture.nativeElement.querySelectorAll('form input')[1]
    const footer = fixture.nativeElement.querySelector('footer')

    expect(section).toBeTruthy()
    expect(h1.textContent).toBe(' Motorcycle ')
    expect(img).toEqual('https://')
    expect(strong.textContent).toBe('vehicles')
    expect(pDescription.textContent).toBe('some motorcycle description')
    expect(divPrice.textContent).toBe(' Current price: $8314')
    expect(form).toBeTruthy()
    expect(priceInput).toBeTruthy()
    expect(submitInput).toBeTruthy()
    expect(footer.textContent).toBe('Listed by Peter ')
  })

  it('should change price input', fakeAsync(() => {
    component.user = true;
    component.userFirstName = 'Peter'
    fixture.detectChanges();

    const priceInput = fixture.nativeElement.querySelectorAll('form input')[0]
    const priceInputValue = '125'

    priceInput.value = priceInputValue
    priceInput.dispatchEvent(new Event('input'))

    tick()
    fixture.detectChanges()

    expect(priceInput.value).toEqual(priceInputValue)
  }))

  it('should call onSubmit', fakeAsync(() => {
    component.user = true;
    component.userFirstName = 'Peter'
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'))
    const func = spyOn(component, 'onSubmit');

    fixture.detectChanges();

    form.triggerEventHandler('ngSubmit', null)
    tick()
    fixture.detectChanges();

    expect(func).toHaveBeenCalled();
  }))

  it('should call offer after form event fire', fakeAsync(() => {
    component.user = true;
    component.userFirstName = 'Peter'
    fixture.detectChanges();

    const priceInput = fixture.nativeElement.querySelectorAll('form input')[0]
    const form = fixture.debugElement.query(By.css('form'))
    const priceInputValue = '8320'

    itemService.offer.and.returnValue(of(true))

    priceInput.value = priceInputValue
    priceInput.dispatchEvent(new Event('input'))
    tick()
    fixture.detectChanges()


    form.triggerEventHandler('ngSubmit', null)
    tick()
    fixture.detectChanges();

    expect(itemService.offer).toHaveBeenCalled()
    expect(errorService.cleanErrors).toHaveBeenCalled()
  }))

  it('should not to call offer after form event fire with lower price', fakeAsync(() => {
    component.user = true;
    component.userFirstName = 'Peter'
    fixture.detectChanges();

    const priceInput = fixture.nativeElement.querySelectorAll('form input')[0]
    const form = fixture.debugElement.query(By.css('form'))
    const priceInputValue = '125'

    itemService.offer.and.returnValue(of(true))

    priceInput.value = priceInputValue
    priceInput.dispatchEvent(new Event('input'))
    tick()
    fixture.detectChanges()


    form.triggerEventHandler('ngSubmit', null)
    tick()
    fixture.detectChanges();

    expect(itemService.offer).not.toHaveBeenCalled()
  }))

  it('should not to call offer after form event fire with wrong input', fakeAsync(() => {
    component.user = true;
    component.userFirstName = 'Peter'
    fixture.detectChanges();

    const priceInput = fixture.nativeElement.querySelectorAll('form input')[0]
    const form = fixture.debugElement.query(By.css('form'))
    const priceInputValue = '-1'

    itemService.offer.and.returnValue(of(true))

    priceInput.value = priceInputValue
    priceInput.dispatchEvent(new Event('input'))
    tick()
    fixture.detectChanges()


    form.triggerEventHandler('ngSubmit', null)
    tick()
    fixture.detectChanges();

    expect(itemService.offer).not.toHaveBeenCalled()
  }))

  it('should render owner template without bider', () => {
    component.user = true;
    component.userFirstName = 'Peter'
    component.isOwner = true;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section')
    const h1 = fixture.nativeElement.querySelector('h1')
    const editLink = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement.getAttribute('href')
    const deleteLink = fixture.debugElement.queryAll(By.css('a'))[1].nativeElement.getAttribute('href')
    const img = fixture.debugElement.query(By.css('img')).nativeElement.getAttribute('src')
    const category = fixture.nativeElement.querySelectorAll('.content.pad-med p')[0]
    const description = fixture.nativeElement.querySelectorAll('.content.pad-med p')[1]
    const divPrice = fixture.nativeElement.querySelector('.align-center div')
    const divBids = fixture.nativeElement.querySelectorAll('.align-center div')[1]
    const footer = fixture.nativeElement.querySelector('footer')

    expect(section).toBeTruthy()
    expect(h1.textContent).toContain('Motorcycle')
    expect(editLink).toEqual('/action/edit/1')
    expect(deleteLink).toEqual('/action/delete/1')
    expect(img).toEqual('https://')
    expect(category.textContent).toEqual('In category: vehicles')
    expect(divPrice.textContent).toBe(' Current price: $8314')
    expect(description.textContent).toEqual('some motorcycle description')
    expect(divBids.textContent).toEqual(' No bids ')
    expect(footer.textContent).toBe('Listed by Peter')
  })

  it('should render owner template with bider', () => {
    const bider = {
      email: 'gosho@abv.bg',
      firstname: 'gosho',
      hashedPassword: 'string',
      lastname: 'goshev',
      __v: 0,
      _id: '2',
    }
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;

    const ITEM = {
      bider: bider,
      category: "vehicles",
      description: 'some motorcycle description',
      imgUrl: "https://",
      owner: 'peter',
      price: 8314,
      title: "Motorcycle",
      __v: 0,
      _id: '1',
    }

    component.item = ITEM;
    component.user = true;
    component.userFirstName = 'Peter'
    component.isOwner = true;
    fixture.detectChanges();

    const section = fixture.nativeElement.querySelector('section')
    const h1 = fixture.nativeElement.querySelector('h1')
    const editLink = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement.getAttribute('href')
    const deleteLink = fixture.debugElement.queryAll(By.css('a'))[1].nativeElement.getAttribute('href')
    const closeAuctionLink = fixture.debugElement.queryAll(By.css('a'))[2].nativeElement.getAttribute('href')
    const img = fixture.debugElement.query(By.css('img')).nativeElement.getAttribute('src')
    const category = fixture.nativeElement.querySelectorAll('.content.pad-med p')[0]
    const description = fixture.nativeElement.querySelectorAll('.content.pad-med p')[1]
    const divPrice = fixture.nativeElement.querySelector('.align-center div')
    const divBids = fixture.nativeElement.querySelectorAll('.align-center div')[1]
    const footer = fixture.nativeElement.querySelector('footer')

    expect(section).toBeTruthy()
    expect(h1.textContent).toContain('Motorcycle')
    expect(editLink).toEqual('/action/edit/1')
    expect(deleteLink).toEqual('/action/delete/1')
    expect(closeAuctionLink).toEqual('/action/userAction/1')
    expect(img).toEqual('https://')
    expect(category.textContent).toEqual('In category: vehicles')
    expect(divPrice.textContent).toBe(' Current price: $8314')
    expect(description.textContent).toEqual('some motorcycle description')
    expect(divBids.textContent).toContain('gosho')
    expect(footer.textContent).toBe('Listed by Peter')
  })

  it('should render owner template without bider and go to Edit page', fakeAsync(() => {
    component.user = true;
    component.userFirstName = 'Peter'
    component.isOwner = true;
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a'))
    links[0].nativeElement.click()

    tick()
    fixture.detectChanges()
    tick()

    expect(location.path()).toBe('/action/edit/1')
  }))

  it('should render owner template without bider and go to Delete page', fakeAsync(() => {
    component.user = true;
    component.userFirstName = 'Peter'
    component.isOwner = true;
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a'))
    links[1].nativeElement.click()

    tick()
    fixture.detectChanges()
    tick()

    expect(location.path()).toBe('/action/delete/1')
  }))

  it('should render owner template with bider and go to CloseOffer page', fakeAsync(() => { 
    const ITEM = {
      bider: {
        email: 'gosho@abv.bg',
        firstname: 'gosho',
        hashedPassword: 'string',
        lastname: 'goshev',
        __v: 0,
        _id: '2',
      },
      category: "vehicles",
      description: 'some motorcycle description',
      imgUrl: "https://",
      owner: 'peter',
      price: 8314,
      title: "Motorcycle",
      __v: 0,
      _id: '1',
    }

    component.item = ITEM;
    component.user = true;
    component.userFirstName = 'Peter'
    component.isOwner = true;

    fixture.detectChanges();
    tick()
    
    const links = fixture.debugElement.queryAll(By.css('a'))
    links[2].nativeElement.click()

    tick()
    fixture.detectChanges()
    tick()

    expect(location.path()).toBe('/action/userAction/1')
  }))
 
});//end
