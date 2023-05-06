import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormValidation } from '../models/form-validation';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: FormValidation,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const msg = $localize `Are you sure you want to leave the form? Changes will be lost`;
    return component.isFormValid() ? true : window.confirm(msg);
  }

}
