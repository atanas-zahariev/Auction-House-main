import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemsService } from 'src/app/services/items.service';
import { ErrorService } from 'src/app/services/error.service';
import { Location } from '@angular/common';

import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

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
    const mockItemService = jasmine.createSpyObj('ItemService', ['details']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError']);

    TestBed.configureTestingModule({
      declarations: [DetailsComponent, DummyComponent],

      providers: [
        { provide: ItemsService, useValue: mockItemService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: [id] } } },
      ],

      imports: [HttpClientTestingModule],
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
});//end
