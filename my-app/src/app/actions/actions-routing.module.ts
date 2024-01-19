import {RouterModule,Routes} from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { UsersGuardService } from '../shared/guards/userGuard';
import { EditComponent } from './edit/edit.component';
import { CloseOfferComponent } from './close-offer/close-offer.component';

const routes : Routes = [
  { 
    path: 'details/:id', 
    component: DetailsComponent 
  },
  {
    path: 'delete/:id',
    component: DeleteComponent,
    canActivate: [UsersGuardService],
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [UsersGuardService],
  },
  {
    path: 'userAction/:id',
    component: CloseOfferComponent,
    canActivate: [UsersGuardService],
  }
]

export const actionsRoutingModule = RouterModule.forChild(routes);