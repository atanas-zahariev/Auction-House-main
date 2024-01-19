import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class UsersGuardService implements CanActivate {
    constructor(private route: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.checkIfLogged(state.url);
    }
    checkIfLogged(url: string): boolean {
        if (localStorage.getItem('user')) {
            return true
        } else {
            this.route.navigate(['/auth/login'])
            return true;
        }
    }
}
