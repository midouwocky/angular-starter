import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { StorageUtils } from '../shared/storage-utils';
import { LoginComponent } from '../login/containers/login/login.component';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    // tslint:disable-next-line: max-union-size tslint:disable-next-line: use-type-alias
  ): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = next.data && next.data.roles ? next.data.roles : undefined;
    return this.authenticatedConditions(roles);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    // tslint:disable-next-line: max-union-size
  ): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (childRoute.component === LoginComponent) {
      return this.notAuthenticatedConditions();
    } else {
      const roles =
        childRoute.data && childRoute.data.roles
          ? childRoute.data.roles
          : undefined;
      return this.authenticatedConditions(roles);
    }
  }

  authenticatedConditions(
    roles: string[]
    // tslint:disable-next-line: max-union-size
  ): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      return this.checkRoles(roles);
    }
    const token = StorageUtils.getAuthToken();
    if (token) {
      return this.authService.checkAuthentication().pipe(
        map(res => {
          // is logged in so can access the component
          this.authService.setAuthenticated(true);
          StorageUtils.setUser(res);
          // check if user has roles to access route
          return this.checkRoles(roles);
        }),
        catchError(error => {
          StorageUtils.removeAuthToken();
          StorageUtils.removeUser();
          this.router.navigate(['login']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  // tslint:disable-next-line: max-union-size
  notAuthenticatedConditions(): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    const token = StorageUtils.getAuthToken();
    if (token) {
      return this.authService.checkAuthentication().pipe(
        map(res => {
          // is logged in so can't access the component
          this.authService.setAuthenticated(true);

          // redirect to home
          this.router.navigate(['']);
          return false;
        }),
        catchError(error => {
          return of(true);
        })
      );
    } else {
      return true;
    }
  }

  checkRoles(roles: string[]): boolean {
    if (roles && roles.length > 0) {
      let hasAccess = false;

      // get the roles from the jwt and check if user has the right roles
      const token = StorageUtils.getAuthToken();
      const jwtDecoded = jwt_decode(token);
      jwtDecoded.roles.forEach(userRole => {
        if (roles.includes(userRole)) {
          hasAccess = true;
        }
      });
      return hasAccess;
    } else {
      return true;
    }
  }
}
