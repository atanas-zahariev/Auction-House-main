import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  const url = 'http://localhost:3000/house'

  const ITEMS = [
    {
      bider: {
        email: "peter@abv.bg",
        firstname: "peter",
        hashedPassword: "$2b$10$4gBHdVfsB42Lif4B0vH7zeUjVmlN2WLeL15p9/fKU1YCI9a3tLama",
        lastname: "petrov",
        __v: 0,
        _id: "64a9673b05bfe576c394eca8"
      },
      category: "vehicles",
      description: "Clasik and beauty!",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Norton_Motorcycle.jpg/1200px-Norton_Motorcycle.jpg",
      owner: "64c7a926212a04d09c7f31d2",
      price: 8314,
      title: "Motorcycle",
      __v: 0,
      _id: "64c7aa75212a04d09c7f31d4"
    },
    {
      bider: {
        email: "gosho@abv.bg",
        firstname: "gosho",
        hashedPassword: "$2b$10$2t3A2KvegeB/x4R.IYm.7OeqAvliw.A/2n9uZYPzoyWu0NdnINCAa",
        lastname: "goshev",
        __v: 0,
        _id: "64af8fe185e3dfae98a6d304"
      },
      category: "electronics",
      description: "not closed",
      imgUrl: "https://img.freepik.com/free-photo/blue-black-muscle-car-with-license-plate-that-says-trans-front_1340-23399.jpg?w=2000",
      owner: "64a9673b05bfe576c394eca8",
      price: 150002,
      title: "Car for real driver!",
      __v: 0,
      _id: "64cc04cb6fe267d02ae835d1",
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ItemsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return ITEMS when catalog() is called', () => {
    service.catalog().subscribe({
      next: items => expect(items).toEqual(ITEMS),
      error: fail
    })

    const request = httpTestingController.expectOne(url + '/catalog')
    request.flush(ITEMS)
    expect(request.request.method).toBe('GET')
  })

  it('should return ITEM when details() is called', () => {
    const id = "64c7aa75212a04d09c7f31d4"
    const ITEM = ITEMS.filter(item => item._id === id)[0]

    service.details(id).subscribe({
      next: item => expect(item).toEqual(ITEM),
      error: fail
    })

    const request = httpTestingController.expectOne(`${url}/details/${id}`)
    request.flush(ITEM)
    expect(request.request.method).toBe('GET')
  })

  it('should make offer()', () => {
    const id = "64c7aa75212a04d09c7f31d4"
    const data = {
      price: '8320'
    }

    service.offer(id,data).subscribe()

    const request = httpTestingController.expectOne(`${url}/details/${id}`)
    expect(request.request.method).toBe('POST')
  })

  it('should close the user offer', () => {
    const id = "64c7aa75212a04d09c7f31d4"

    service.closeOffer(id).subscribe()

    const request = httpTestingController.expectOne(`${url}/userAction/${id}`)
    expect(request.request.method).toBe('GET')
  })

  it('userClosedOfers() should return ITEMS', () => {
    service.userClosedOffers().subscribe({
      next: items => expect(items).toEqual(ITEMS),
      error:fail
    })

    const request = httpTestingController.expectOne(`${url}/closed`)
    request.flush(ITEMS)
    expect(request.request.method).toBe('GET')
  })

  it('should create new item', () => {
    const item = {
      title: 'new item',
      category: 'other',
      imgUrl: 'https://',
      price: '25',
      description: 'new item description'
    }

    service.create(item).subscribe()

    const request = httpTestingController.expectOne(`${url}/create`)
    
    expect(request.request.method).toBe('POST')
  })
});
