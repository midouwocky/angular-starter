import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageUtils } from '../storage-utils';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RealTimeService {
  socketUrl = environment.endpoints.realTimeUrl;
  stompClient: any;
  connected = false;
  socketChannel = environment.endpoints.realTimeChannel;
  connexionTimout: any;
  liveCode: string;

  private someNotfication = new Subject<any>();
  someNotifier$ = this.someNotfication.asObservable();

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  connect(auth = false) {
    if (this.connected) {
      return;
    }

    const XSRF = 'XSRF-TOKEN';

    let token = null;
    if (this.authService.isAuthenticated()) {
      token = StorageUtils.getAuthToken();
    }

    let csrfToken = this.cookieService.get(XSRF);
    const headers: any = {};
    headers[XSRF] = csrfToken;
    let url = this.socketUrl;
    if (token && auth) {
      headers['Authorization'] = `Bearer ${token}`;
      url = url + '?access_token=' + token;
    }
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const thisClass = this;
    this.stompClient.connect(
      headers,
      function connect(frame) {
        thisClass.connected = true;
        csrfToken = thisClass.cookieService.get(XSRF);
        headers[XSRF] = csrfToken;
        console.log('connected to websockets');

        thisClass.stompClient.subscribe(
          thisClass.socketChannel,
          function subscribe(object: any) {
            console.log('Received a WS Notification');
            console.log(JSON.parse(object.body));
            const wsObject = JSON.parse(object.body);
            switch (wsObject.type) {
              case 'TYPE': {
                thisClass.someNotification(wsObject);
                break;
              }
              case 'TYPE2': {
                thisClass.someNotification(wsObject);
                break;
              }

              default:
                break;
            }
          },
          headers,
          error => {
            setTimeout(() => {
              thisClass.connect();
            }, 2000);
          }
        );
      },
      err => {
        this.stompClient.disconnect();
        this.connected = false;
        console.log(err);
        if (this.connexionTimout) {
          clearTimeout(this.connexionTimout);
        }
        this.connexionTimout = setTimeout(() => {
          this.connect();
        }, 2000);
      }
    );
  }

  someNotification(wsObject) {
    switch (wsObject.action) {
      case 'ACTION': {
        // notify a subject Observable
        this.notifySomething(wsObject.object);
        break;
      }
      case 'ACTION2': {
        break;
      }
    }
  }

  notifySomething(something: any) {
    this.someNotfication.next(something);
  }
}
