import { Injectable } from '@angular/core';
import { StorageUtils } from '../shared/storage-utils';
import { Credentials } from '../shared/models/credentials.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false;

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(environment.endpoints.loginUrl, credentials);
  }

  checkAuthentication(): Observable<any> {
    return this.http.get(environment.endpoints.profile);
  }

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
