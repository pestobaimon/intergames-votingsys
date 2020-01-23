import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/providers/user.service';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.page.html',
  styleUrls: ['./registered.page.scss'],
})
export class RegisteredPage implements OnInit {

  constructor(
    private userService : UserService
  ) { }

  ngOnInit() {
  }
  clearUser(){
    this.userService.clearUserData();
    location.reload();
  }
}
