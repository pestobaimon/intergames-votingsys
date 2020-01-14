import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHomeGuard implements CanActivate {
  constructor(
    private authService : AuthService,
    private router : Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let url: string = state.url;

      return this.checkIdSubmitted(url);
    }

    checkIdSubmitted(url:string): boolean {
      if(this.authService.dataSubmitted){
        return true;
      }else{
        this.authService.redirectUrl = url;

        this.router.navigate(['/register']);
        return false;
      }
    }
}
