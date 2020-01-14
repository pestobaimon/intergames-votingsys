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
    id : string;
    data : any;
    inputid(id_string:string) {
        this.id = id_string;
        this.alertService.presentLoading();
            this.afs.collection(`users`).doc(id_string).get() //check with firestore database that this id have been created or not
            .toPromise()
            .then(doc => {
                if(!doc.exists) {
                    console.log('Not register Student ID!');
                    this.afs.collection(`users`).doc(id_string).set({
                        StudentID : this.id
                    }).then((result)=>{
                        console.log(result);
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
        this.afs.collection(`users`).doc(this.id)
        .update(data)
        .then(() => {
            this.authService.setDataState(true);
            this.router.navigate(['/home'])
        })
        .catch(err => {
            console.log('error',err);
        });
    }
}

