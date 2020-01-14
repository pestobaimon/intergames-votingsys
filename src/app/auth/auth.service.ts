import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userState : any; 
  idSubmitted : boolean = false;
  dataSubmitted : boolean = false;
  redirectUrl:string;
  constructor(
  ) {
    this.userState = JSON.parse(localStorage.getItem('userState'));
    if(this.userState === null){
    }else{
      this.idSubmitted = this.userState.idSubmitted;
      this.dataSubmitted = this.userState.dataSubmitted;
    }
  }
  setIdState(state:boolean){
    this.idSubmitted = state;
    this.setUserState();
  }
  setDataState(state:boolean){
    this.dataSubmitted = state;
    this.setUserState();
  }
  setUserState(){
    this.userState = {
      idSubmitted : this.idSubmitted,
      dataSubmitted : this.dataSubmitted
    }
    localStorage.setItem('userState', JSON.stringify(this.userState));
  }
}
