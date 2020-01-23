import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
//import { LoadingController } from '@ionic/angular';
import { VoteService } from '../../providers/vote.service';
import { AlertService } from '../../providers/alert.service';
import { UserService } from 'src/providers/user.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name: string;
  status: number;
  constructor(//public codeProvider : CodeProvider, HEEROKU
    private alertController : AlertController,
    private voteService : VoteService,
    private alsv : AlertService,
    private userService : UserService
    ){
  }
  async voteAlert(name:string){
    const alert = await this.alertController.create({
      header: 'Input Your Student ID',
      inputs: [{
          name: 'code',
          type: 'text',
          placeholder: 'ex. 61318xxxxx'
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
            if(!data.code){
              this.alsv.inputEmptyAlert();
            }else{
              this.vote(name,String(data.code));
            }
            console.log('Vote clicked');
          }
        }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result)
  }
  vote(name:string,code:string){
    this.voteService.vote(name,code);
  }
}
