import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-ahmed';
  ready = false;
  constructor(translate: TranslateService) {
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
}
