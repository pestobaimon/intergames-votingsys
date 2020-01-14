import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private registerForm: FormGroup;
  private years: Array<string> = ['1','2','3','4'];
  private faculties: Array<string> = ['ISE', 'BBA'];

  constructor(public formBuilder: FormBuilder) {

    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      year: ['', Validators.required],
      faculty: ['', Validators.required],
    });
  }
  submit() {
  }

  ngOnInit() {
  }

}
