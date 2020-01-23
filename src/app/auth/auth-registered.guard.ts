import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRegisteredGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.isRegistered(url);
  }

  isRegistered(url:string): boolean {
    if (this.authService.dataSubmitted){
      console.log('registered');
      return true;
    } else {
      this.authService.redirectUrl = url;
      this.router.navigate(['/register']);
      console.log('not registered')
      return false;
    }
  }
}
