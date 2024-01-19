import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { actionsRoutingModule } from './actions-routing.module';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { CloseOfferComponent } from './close-offer/close-offer.component';



@NgModule({
  declarations: [
    DetailsComponent,
    EditComponent,
    DeleteComponent,
    CloseOfferComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    actionsRoutingModule
  ]
})
export class ActionsModule { }
