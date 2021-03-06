import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'lazy',
    loadChildren: './lazy/lazy.module#LazyModule'
  },
  {
    path: '',
    loadChildren: './content/content.module#ContentModule',
    canActivateChild: [AuthGuard],
    data: {
      roles: ['admin']
    }
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivateChild: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
