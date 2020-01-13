import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-starter';
  ready = false;
  constructor(
    translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    // add the languages from assets/i18n
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    // use default browser language
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    // use english as default language
    translate.use('en').subscribe(res => {
      this.ready = true;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
