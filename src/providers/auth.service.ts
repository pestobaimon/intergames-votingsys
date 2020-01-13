import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';

 
@Injectable({providedIn:'root'})
export class AuthService {
 
  authState = new BehaviorSubject(false);
 
  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private alertService: AlertService){}

  login(password:string) {
    if(!password){
      this.alertService.inputEmptyAlert();
    }else{
      this.alertService.presentLoading();
      this.afs.collection('freshcodepw').doc('pw1').get().subscribe( data =>{
          if(data.get('password') == password){
              this.router.navigate(['freshcodes']);
              this.authState.next(true);
              this.alertService.dismissLd();
          }else{
              this.alertService.pwInvalidAlert();
          }
      })
    }
  }
 
  logout() {
    this.authState.next(false);
  }
 
  isAuthenticated() {
    return this.authState.value;
  }
 
}