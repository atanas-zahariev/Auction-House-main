import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getError() should set Error to array if argument is string', () => {
    const error = 'error'
    service.getError(error)

    expect(service.Error).toEqual(['error'])
  })

  it('getError() should set Error to array if argument is array', () => {
    const error = ['error']
    service.getError(error)

    expect(service.Error).toEqual(error)
  })

  it('getError() should set Error to array if argument is object', () => {
    const error = {}
    service.getError(error)

    expect(service.Error).toEqual(['There seems to be a problem please try again later'])
  })

  it('should clean Error after cleanErrors is called', () => {
    service.Error = ['error']
    service.cleanErrors()
    expect(service.Error).toEqual([])
  })
});
