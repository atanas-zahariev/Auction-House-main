import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { UserClosedOffersComponent } from './user-closed-offers/user-closed-offers.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { itemRoutingModule } from './item-routing.module';



@NgModule({
  declarations: [
    CatalogComponent,
    UserClosedOffersComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    itemRoutingModule,
    ReactiveFormsModule,
  ]
})

export class ItemsModule { }
