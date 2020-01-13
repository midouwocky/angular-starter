import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule} from '@ngx-translate/core';


const loaded = false;


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TranslateModule,
    HttpClientModule
  ]
})
export class SharedModule {}
