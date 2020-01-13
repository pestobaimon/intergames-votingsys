import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-input-id',
  templateUrl: './input-id.page.html',
  styleUrls: ['./input-id.page.scss'],
})
export class InputIdPage implements OnInit {


  private id: string;
  private id_string: string;

  constructor(
    public router: Router,
    public alertController: AlertController,
    public afs: AngularFirestore
  ) {}

  ngOnInit() {
  }

  checkID(){
  }

  inputid() {
    this.id_string = this.id.toString()
    if (this.id_string.length == 10) {
      this.afs.collection(`users`).doc(this.id_string).get() //check with firestore database that this id have been created or not
        .toPromise()
        .then(doc => {
          if(!doc.exists) {
            console.log('Not register Student ID!');
            this.afs.collection(`users`).doc(this.id_string).set({
              StudentID : this.id
            })
            this.router.navigate([""]); //redirect to register page
          } else {
            // this.showAlert("Error", "ID Already Created!")
            console.log('Document Data: ', doc.data());
            this.router.navigate(["home"]);
          }
        })
        .catch(err =>{
          console.log('Error',err);
        })
        // console.log("hey")
    }
    else {
      this.showAlert("Error", "Please input 10 Digit Student ID!")
    }
  }

  // inputid() {
  //   this.id_string = this.id.toString()
  //   if (this.id_string.length == 10) {
  //     if (this.afs.collection(`users`).doc(this.id_string).get()
  //       .toPromise()
  //       .then(doc => {
  //         if(!doc.exists) {
  //           console.log('No ID!');
  //         } else {
  //           console.log('Document Data: ', doc.data());
  //         }
  //       })
  //       .catch(err =>{
  //         console.log('Error',err);
  //       })
  //       ) { //to check with firestore database that this id have been created or not
  //       this.showAlert("Error", "ID Already Created!")
  //       this.router.navigate(["home"]);
  //       console.log("hey")
        
  //     } 
  //     else {
  //       this.afs.collection(`users`).doc(this.id_string).set({
  //         StudentID : this.id
  //       })
  //       this.router.navigate([""]); //redirect to register page
  //     }
  //   }
  //   else {
  //     this.showAlert("Error", "Please input 10 Digit Student ID!")
  //   }
  // }

  async showAlert(header: string,message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result)
  }
}
