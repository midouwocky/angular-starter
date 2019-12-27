import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EagerComponent } from './components/eager.component';


const routes: Routes = [
  {
    path: 'eager', component: EagerComponent // , canActivate: [UserDisconnectGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EagerRoutingModule { }
