import {RouterModule,Routes} from '@angular/router';
import { AuthGuardService } from '../shared/guards/authGuard';
import { UsersGuardService } from '../shared/guards/userGuard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

const routes : Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuardService],
    
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [UsersGuardService],
      }
]

export const authRoutingModule = RouterModule.forChild(routes)
