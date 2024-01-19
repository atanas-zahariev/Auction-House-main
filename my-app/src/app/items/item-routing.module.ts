import {RouterModule,Routes} from '@angular/router';
import { UsersGuardService } from '../shared/guards/userGuard';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { UserClosedOffersComponent } from './user-closed-offers/user-closed-offers.component';

const routes : Routes = [
    {
        path: 'closed',
        component: UserClosedOffersComponent,
        canActivate: [UsersGuardService],
      },
      { path: 'catalog', component: CatalogComponent },
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [UsersGuardService],
      },
]

export const itemRoutingModule = RouterModule.forChild(routes);