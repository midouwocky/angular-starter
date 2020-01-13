import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';

const loaded = false;

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, FlexLayoutModule],
  exports: [TranslateModule, HttpClientModule, FlexLayoutModule],
  providers: [CookieService],
})
export class SharedModule {}
