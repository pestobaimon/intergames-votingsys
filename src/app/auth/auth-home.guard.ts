import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HomeauthService } from 'src/providers/homeauth.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthHomeGuard implements CanActivate {
  server_res:boolean = false;
  constructor(
    private haS : HomeauthService,
    private router : Router,
    private afs : AngularFirestore
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> {
      let url: string = state.url;
      return this.haS.home_activated$.pipe(
        map( e =>{
          if (e.activated){
            return true;
          } else {
            return false;
          }
        })
      )
    }
}
