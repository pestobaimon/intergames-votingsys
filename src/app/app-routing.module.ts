import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
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
    canActivate: [AuthGuard]
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
    
  }


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
