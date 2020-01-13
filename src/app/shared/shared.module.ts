import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule} from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';


const loaded = false;


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
