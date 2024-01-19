import { TestBed } from '@angular/core/testing';

import { ItemsService } from './items.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler]
    });
    service = TestBed.inject(ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
