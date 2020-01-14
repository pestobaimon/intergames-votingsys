import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({providedIn : 'root'})
export class UserService {

    constructor(
        public router: Router,
        public alertController: AlertController,
        public afs: AngularFirestore,
        public alertService: AlertService,
        public authService : AuthService
        ) {}
    data : any;
    userData : any;
    inputid(id_string:string) {
        this.userData = {id : id_string}
        this.setUserData(this.userData);
        this.alertService.presentLoading();
            this.afs.collection(`users`).doc(id_string).get() //check with firestore database that this id have been created or not
            .toPromise()
            .then(doc => {
                if(!doc.exists) {
                    console.log('ID not registered');
                    this.afs.collection(`users`).doc(id_string).set({
                        StudentID : this.userData.id
                    }).then(()=>{                        
                        this.authService.setIdState(true);
                        this.router.navigate(["/register"]); //redirect to register page
                        this.alertService.dismissLd();
                    }).catch(err=>{
                        console.log('error',err);
                    });
                } else if(!doc.data().firstName) {
                    this.authService.setIdState(true);
                    this.router.navigate(['/register']);
                    this.alertService.dismissLd();
                } else {
                    console.log('Document Data: ', doc.data());
                    this.userData = doc.data();
                    this.setUserData(doc.data());
                    this.authService.setIdState(true);
                    this.authService.setDataState(true);
                    this.router.navigate(["/home"]);
                    this.alertService.dismissLd();
                }
            })
            .catch(err =>{
                console.log('Error',err);
            })
        }
    
    submitUserData(data:any){
        this.data = data;
        this.afs.collection(`users`).doc(this.userData.id)
        .update(data)
        .then(() => {
            let temp_id = this.userData.id;
            this.userData = data;
            this.userData.id = temp_id;
            this.setUserData(this.userData);
            this.authService.setDataState(true);
            this.router.navigate(['/home'])
        })
        .catch(err => {
            console.log('error',err);
        });
    }
    setUserData(data:any){
        localStorage.setItem('userData',JSON.stringify(data));
    }
    getUserData():any{
        return JSON.parse(localStorage.getItem('userData'));
    }
}

