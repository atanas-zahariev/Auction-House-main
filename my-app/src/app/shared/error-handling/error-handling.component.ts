import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent {

  constructor(private errorService: ErrorService) {
    this.errorService.cleanErrors()
  };

  get errorArray(): string[] | undefined {
    if (this.errorService.Error.length > 0) {
      return this.errorService.Error
    }else{
      return undefined
    } 
   
  }
}
