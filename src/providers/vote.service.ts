import { Injectable } from "@angular/core";
import { Codeauth } from '../models/codeauth.model';
import { AngularFirestore } from 'angularfire2/firestore';



@Injectable({providedIn: 'root'})
export class voteService{
    constructor(private db: AngularFirestore,){}
    

        
    add(){
        this.db.collection('codeauth')
    }
}