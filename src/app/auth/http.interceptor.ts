import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageUtils } from '../shared/storage-utils';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = StorageUtils.getAuthToken();

        if (token) {
            let decoded = null;
            try {
                decoded = jwt_decode(token);
            } catch (error) {
                console.log(error);
            }
            if (decoded) {
                const dateExp = new Date(0);
                dateExp.setUTCSeconds(decoded.exp);
                // return date;
                if (!(dateExp.valueOf() > new Date().valueOf())) {
                    // token expired , Action : Logout
                    this.authService.logout();
                } else {
                    // token not expired yet , Action : send the new header
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
            }
        }
        return next.handle(request);
    }
}
