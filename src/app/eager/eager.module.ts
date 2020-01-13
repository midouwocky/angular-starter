import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EagerComponent } from './components/eager.component';
import { EagerRoutingModule } from './eager-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [EagerComponent],
  imports: [
    CommonModule,
    EagerRoutingModule,
    SharedModule
  ]
})
export class EagerModule { }
