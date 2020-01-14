import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
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
      if(this.authService.idSubmitted){
        return true;
      }else{
        this.authService.redirectUrl = url;

        this.router.navigate(['/input-id']);
        return false;
      }
    }

}
