import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CodeProvider } from '../../providers/code';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name: string;
  status: number;
  constructor(public codeProvider : CodeProvider, public alertController: AlertController){}
  async voteAlert(name:string){
    const alert = await this.alertController.create({
      header: 'Input Your Code',
      inputs: [{
          name: 'code',
          type: 'text',
          placeholder: 'ex. 1234ABCD'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Vote',
          handler: data => {
            this.vote(name,data.code);
            console.log('Vote clicked');
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result)
  }

  async voteTrue(){
    const alert = await this.alertController.create({
      message: 'Vote Successful!',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result)
  }
  async voteFalse(){
    const alert = await this.alertController.create({
      message: "Invalid code. Please try again.",
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result)
  }
  
  vote(name:string,code:string){
    this.codeProvider.vote(name,code).subscribe(data => {
      console.log("return Data:");
      console.log(Number(data));
      var num = Number(data);
      if (num == 1){
        this.voteTrue();
      }else{
        this.voteFalse();
      }
    });
  }
}
