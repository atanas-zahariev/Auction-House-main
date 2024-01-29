import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

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

  beforeEach(waitForAsync(() => {
    const mockItemService = jasmine.createSpyObj('ItemService', ['details', 'offer']);
    const mockErrorService = jasmine.createSpyObj('ErrorService', ['cleanErrors', 'getError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({

      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],

      declarations: [EditComponent],

      providers:[
        { provide: ItemsService, useValue: mockItemService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: ActivatedRoute, useValue: { snapshot: { params: [id] } } },
        { provide: Router, useValue: routerSpy },
      ],

      schemas:[NO_ERRORS_SCHEMA]
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
    component.editItem(ITEM);
    fixture.detectChanges();
  })

  it('should create', () => {
    const section = fixture.nativeElement.querySelector('section')
    console.log(section);
    console.log(component.editForm)
    expect(component).toBeTruthy();
  });
});
