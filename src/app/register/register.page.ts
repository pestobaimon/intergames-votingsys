import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../providers/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public registerForm: FormGroup;
  public years: Array<string> = ['1', '2', '3', '4'];
  public faculties: Array<string> = ['BBA', 'AERO', 'BSAC', 'INDA', 'BAScii', 'ADME', 'CommDe', 'COMMARTS', 'EBA', 'ICE', 'BALAC', 'NANO', 'PGS', 'JIPP', 'RAIE'];
  public studentID: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.studentID = this.userService.getStudentID();
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      year: ['', Validators.required],
      faculty: ['', Validators.required],
    });
  }

  submit() {
    if (this.registerForm.valid) {
      const name = this.registerForm.get('name').value;
      const lastName = this.registerForm.get('lastName').value;
      const year = this.registerForm.get('year').value;
      const faculty = this.registerForm.get('faculty').value;

      const formSubmitted: any = {
        firstName: name,
        lastName: lastName,
        year: year,
        faculty: faculty
      }
      this.userService.submitUserData(formSubmitted);
    } else {
      console.error('error');
    }
  }

  checkStatus() {
    console.log('id:', this.authService.idSubmitted);
    console.log('reg:', this.authService.dataSubmitted);
  }

}
