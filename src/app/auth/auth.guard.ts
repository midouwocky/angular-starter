import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { StorageUtils } from '../shared/storage-utils';

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
    if (this.authService.isAuthenticated()) {
      return true;
    }
    const token = StorageUtils.getAuthToken();
    if (token) {
      return this.authService.checkAuthentication()
        .pipe(map(res => {
          this.authService.setAuthenticated(true);
          return !!res;
        }));
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    const token = StorageUtils.getAuthToken();
    if (token) {
      return this.authService.checkAuthentication()
        .pipe(map(res => {
          this.authService.setAuthenticated(true);
          return !!res;
        }));
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
