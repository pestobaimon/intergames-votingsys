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

  private id_string: string;
  private id: number;

  constructor(
    public router: Router,
    public alertController: AlertController,
    public afs: AngularFirestore
  ) {}

  ngOnInit() {
  }

  checkID(){
    this.id = Number(this.id_string);
    if (isNaN(this.id)) { //check if input contain string
      this.showAlert("Error" , " Your student ID shouldn't contain text")
    } else {
      if (this.id_string.length != 10) {  //check if input is with length 10
        this.showAlert("Error" , "This is not 10 digit student ID" )
      } else {
        if (Number(this.id_string.substring(0,2)) < 57 || Number(this.id_string.substring(0,2)) > 62) { //check if first two digit is current student
          this.showAlert("Error" , "This is not current student ID" )
        } else {
          this.inputid()
        }     
      }
    }
  }

  inputid() {
    this.id = Number(this.id_string);
      this.afs.collection(`users`).doc(this.id_string).get() //check with firestore database that this id have been created or not
        .toPromise()
        .then(doc => {
          if(!doc.exists) {
            console.log('Not register Student ID!');
            this.afs.collection(`users`).doc(this.id_string).set({
              StudentID : this.id
            })
            this.router.navigate(["register"]); //redirect to register page
          } else {
            console.log('Document Data: ', doc.data());
            this.router.navigate(["home"]);
          }
        })
        .catch(err =>{
          console.log('Error',err);
        })
  }

  async showAlert(header: string,message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["Ok"]
    })
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result)
    console.log(message)
  }
}
