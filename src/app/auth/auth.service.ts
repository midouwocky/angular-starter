import { Injectable } from '@angular/core';
import { StorageUtils } from '../shared/storage-utils';
import { Credentials } from '../shared/models/credentials.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import * as jwt_decode from 'jwt-decode';

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

    checkAuthentication(): Observable<User> {
        return this.http.get<User>(environment.endpoints.profile);
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
        StorageUtils.removeUser();
        this.setAuthenticated(false);
    }

    isTokenExpired(): boolean {
        const token = StorageUtils.getAuthToken();

        if (token) {
            let decoded = null;
            try {
                decoded = jwt_decode(token);
            } catch (error) {
                console.error(error);
                return true;
            }
            if (decoded) {
                const dateExp = new Date(0);
                dateExp.setUTCSeconds(decoded.exp);

                // return date;
                if (!(dateExp.valueOf() > new Date().valueOf())) {
                    // token expired, returns true
                    return true;
                } else {
                    // token not expired yet , returns false
                    return false;
                }
            }
        } else {
            // no token so returns true
            return true;
        }
    }
}
