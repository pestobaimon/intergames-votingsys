import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from './alert.service';     

@Injectable({providedIn: 'root'})
export class VoteService{
    constructor(private afs: AngularFirestore,
                private alservice: AlertService){}
    private codeRef = this.afs.collection('codeauth');
    private partRef = this.afs.collection('participants');

    vote(name:string,code:string){
        this.alservice.presentLoading();
        const codeReff = this.codeRef.doc(code);
        codeReff.get().subscribe( data => {
            if(!data){
                console.log('Code not found')
                this.alservice.voteFalse();
            }
            else if(data.get("status")==1){
                this.updateCode(code,0); //change code state to used.
                this.updateScore(name);
                this.updateCodeCount();
                this.alservice.voteTrue();
            }
            else{
                console.log('err. code is already used.');
                this.alservice.voteFalse();
            }
        })
    }
    updateCode(code:string, newstat: number){
        this.codeRef.doc(code).get().subscribe( data =>{
        if(!data){
            console.log('no data found');
            return false;
        }
        this.codeRef.doc(code).update({"status":newstat});
        console.log('code '+data.get('code')+' updated');
        return true;
        },error =>{
            console.log('update code error');
            return false;
        })
    }
    updateScore(name:string){ 
        this.partRef.doc(name).get().subscribe( data => {
            if(!data){
                return false;
            }
            this.partRef.doc(name).update({"score": data.get("score")+1});
            console.log('score updated');
            return true;
        },error =>{
            console.log('update score error');
            return false;
        });
    }
    updateCodeCount(){
        const db = this.afs.collection('codecount').doc('set1');
        db.get().subscribe( data =>{
            var newused = data.get('used')+1;
            var newunused = data.get('unused')-1;
            db.update({'unused': newunused });
            db.update({'used': newused});
            console.log('code count updated');
            console.log('used codes: '+newused+' unused codes: '+newunused);
        })
    }
}