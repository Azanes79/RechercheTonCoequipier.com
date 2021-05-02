import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_shared/_guard/auth.guard';


const routes: Routes = [{ path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] }, { path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule), canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
