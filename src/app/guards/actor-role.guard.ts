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
      console.log('ROLES', expectedRoles)
      const currentActor = this.authService.getCurrentActor();
      if (currentActor) {
        console.log('HABEMUS ACTOR', currentActor.role)
        if (expectedRoles.includes(currentActor.role)) {
          console.log('QUE PASE')
          resolve(true);
        } else {
          this.router.navigate(['denied-access'], { queryParams: { previousURL: state.url } })
        }
      } else {
        console.log('NO HAY ACTOR');

        if (!expectedRoles.includes(Role.ANONYMOUS)) {
          console.log('LOGIN REQUERIDO');
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } })
        }
        console.log('PERO HAY ACCESO ANONIMO');
        resolve(true);
      }
    });
  }

}
