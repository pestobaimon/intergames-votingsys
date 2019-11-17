import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  password: string;
  constructor(
    private authservice: AuthService,
    private router: Router
  ){}
  
  login(password:string){
    this.authservice.login(password)
  }

  ngOnInit() {
    if(this.authservice.isAuthenticated()==true){
      this.router.navigate(['freshcodes'])
    }else{
    }
  }

}
