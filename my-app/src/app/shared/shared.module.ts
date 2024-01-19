import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';



@NgModule({
  declarations: [
    ErrorHandlingComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ErrorHandlingComponent]
})
export class SharedModule { }
