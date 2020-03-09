import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthRegisterGuard} from './auth/auth-register.guard';
import { AuthRegisteredGuard } from './auth/auth-registered.guard';
import { AuthHomeGuard } from './auth/auth-home.guard';


const routes: Routes = [
  { path: '', redirectTo: 'input-id', pathMatch: 'full' },
  { path: 'home',
   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
   canActivate:[AuthHomeGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AuthGuard, AuthRegisterGuard]
  },
  {
    path: 'input-id',
    loadChildren: () => import('./input-id/input-id.module').then( m => m.InputIdPageModule)
  },
  {
    path: 'edit-information',
    loadChildren: () => import('./edit-information/edit-information.module').then( m => m.EditInformationPageModule)
  },
  {
    path: 'registered',
    loadChildren: () => import('./registered/registered.module').then( m => m.RegisteredPageModule),
    canActivate: [AuthGuard, AuthRegisteredGuard]
    
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then( m => m.ResultPageModule)
  }


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
