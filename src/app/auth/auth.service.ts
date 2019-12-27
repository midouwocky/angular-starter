import { Injectable } from '@angular/core';
import { StorageUtils } from '../shared/storage-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false;

  constructor() { }


  /**
   * check if authenticated
   */
  isAuthenticated(): boolean {
    return this.authenticated;
  }
  /**
   * set if is authenticated
   * @param auth;
   */
  setAuthenticated(auth: boolean) {
    this.authenticated = auth;
  }

  logout() {
    StorageUtils.removeAuthToken();
    this.setAuthenticated(false);
  }
}
