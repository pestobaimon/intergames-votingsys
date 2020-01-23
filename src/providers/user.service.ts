import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { AuthService } from 'src/app/auth/auth.service';
//import { ThrowStmt } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class UserService {

    userData: any;
    student_id: string;

    constructor(
        private router: Router,
        private afs: AngularFirestore,
        private alertService: AlertService,
        private authService: AuthService
    ) { }

    inputid(id_string: string) {
        this.userData = { id: id_string };
        this.student_id = id_string;
        this.setUserData(this.userData);
        //console.log('inputid: ',this.userData)
        this.authService.setIdState(true);
        this.checkID();
    }

    checkID() {
        const id = this.student_id;
        this.alertService.presentLoading();
        this.afs.collection(`users`).doc(id).get() //check with firestore database that this id have been created or not
            .toPromise()
            .then(doc => {
                let dc = doc.data();

                const noInfo = (typeof dc.faculty == "undefined") || (typeof dc.year == "undefined")
                || (typeof dc.firstName == "undefined") || (typeof dc.lastName == "undefined");

                if (!doc.exists) {
                    console.log('ID not registered');
                    //this.student_id = id;
                    //this.authService.setIdState(true);
                    this.router.navigate(["/register"]); //redirect to register page
                    this.alertService.dismissLd();
                } else if(noInfo){
                    this.router.navigate(["/register"]);
                    this.alertService.dismissLd();
                } else {
                    console.log('Document Data: ', doc.data());
                    this.userData = doc.data();
                    this.setUserData(doc.data());
                    //this.authService.setIdState(true);
                    this.authService.setDataState(true);
                    this.alertService.dismissLd();
                    this.alertService.alreadySubmitted();
                    this.router.navigate(["/home"]);
                    this.alertService.dismissLd();
                }
            })
            .catch(err => {
                console.error('Error', err);
            })
    }

    submitUserData(data: any) {
        this.alertService.presentLoading();
        this.userData = data;
        this.userData.id = this.student_id;
        this.userData.recordedTime = new Date();
        this.afs.collection(`users`).doc(this.student_id)
            .set(this.userData)
            .then(() => {
                this.afs.collection('codeauth').doc(this.student_id).set({
                    code: this.student_id,
                    recordedTime: new Date(),
                    status: 1
                }).then(() => {
                    console.log('code added');
                }).catch(err => {
                    console.log('error', err);
                })
                this.setUserData(this.userData);
                this.authService.setDataState(true);
                this.alertService.dismissLd();
                this.router.navigate(['/registered']);
            })
            .catch(err => {
                console.log('error', err);
            });
    }
    setUserData(data: any) {
        localStorage.setItem('userData', JSON.stringify(data));
    }
    clearUserData() {
        localStorage.clear();
        this.authService.setDataState(false);
        this.authService.setIdState(false);
        location.reload()
    }
    getUserData(): any {
        return JSON.parse(localStorage.getItem('userData'));
    }
    getStudentID(): string {
        //console.log(this.userData);
        return this.getUserData().id;
    }
}

