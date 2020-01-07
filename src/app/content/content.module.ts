import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './containers/content/content.component';
import { ContentRoutingModule } from './content-routing.module';
import { ContentCompComponent } from './components/content-comp/content-comp.component';



@NgModule({
  declarations: [
    ContentComponent,
    ContentCompComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule
  ]
})
export class ContentModule { }
