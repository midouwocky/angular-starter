import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, onErrorResumeNext, catchError } from 'rxjs/operators';
import { StorageUtils } from '../shared/storage-utils';
import { LoginComponent } from '../login/containers/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticatedConditions();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (childRoute.component === LoginComponent) {
      return this.notAuthenticatedConditions();
    } else {
      return this.authenticatedConditions();
    }
  }

  authenticatedConditions(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    const token = StorageUtils.getAuthToken();
    if (token) {
      return this.authService.checkAuthentication()
        .pipe(map(res => {
          // is logged in so can access the component
          this.authService.setAuthenticated(true);
          return !!res;
        }), catchError((error) => {
          StorageUtils.removeAuthToken();
          this.router.navigate(['login']);
          return of(false);
        }));
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  notAuthenticatedConditions(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    const token = StorageUtils.getAuthToken();
    if (token) {
      return this.authService.checkAuthentication()
        .pipe(map(res => {

          // is logged in so can't access the component
          this.authService.setAuthenticated(true);

          // redirect to home
          this.router.navigate(['']);
          return false;
        }), catchError((error) => {
          return of(true);
        }));
    } else {
      return true;
    }
  }
}
