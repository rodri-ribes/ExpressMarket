import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuardGuard } from './guards/user-guard.guard';
import { UserIsLoginGuard } from './guards/user-is-login.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
 {path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule), canActivate: [UserGuardGuard] },
 { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule), canActivate: [UserIsLoginGuard] }, 
 { path: 'signin', loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninModule), canActivate: [UserIsLoginGuard] },
 { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule), canActivate: [UserGuardGuard]  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
