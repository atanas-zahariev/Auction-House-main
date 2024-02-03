import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHandlingComponent } from './error-handling.component';
import { ErrorService } from 'src/app/services/error.service';

describe('ErrorHandlingComponent', () => {
  let component: ErrorHandlingComponent;
  let fixture: ComponentFixture<ErrorHandlingComponent>;
  let errorService: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorHandlingComponent],
      providers: [
         ErrorService
      ]
    });
    
    errorService = TestBed.inject(ErrorService)
    fixture = TestBed.createComponent(ErrorHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    errorService.Error = ['error']
    fixture.detectChanges()
    const pError = fixture.nativeElement.querySelector('p')
    
    expect(component).toBeTruthy();
    expect(pError.textContent).toEqual('error')
  });
});
