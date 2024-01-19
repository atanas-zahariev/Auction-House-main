import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';
import { DefaultComponent } from './default/default.component';



@NgModule({
  declarations: [
    NavigationComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[NavigationComponent,DefaultComponent]
})
export class CoreModule { }
