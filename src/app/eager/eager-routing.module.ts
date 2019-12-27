import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EagerComponent } from './components/eager.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: 'eager',
    component: EagerComponent
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EagerRoutingModule { }
