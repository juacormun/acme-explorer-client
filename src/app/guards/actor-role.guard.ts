import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Role } from '../enums/RoleEnum';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise ((resolve, reject) => {
      const expectedRoles = route.data['expectedRoles'];
      const currentActor = this.authService.getCurrentActor();
      if (currentActor) {
        if (expectedRoles.includes(currentActor.role)) {
          resolve(true);
        } else {
          this.router.navigate(['denied-access'], { queryParams: { previousURL: state.url } })
        }
      } else {
        if (!expectedRoles.includes(Role.ANONYMOUS)) {
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } })
        }
        resolve(true);
      }
    });
  }

}
