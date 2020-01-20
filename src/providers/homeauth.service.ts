import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({providedIn : 'root'})
export class HomeauthService {

    constructor(
        private afs : AngularFirestore
    ){
        this.home_activated$ = this.afs.collection('activate_homepage').doc('activation')
        .valueChanges()

    }
    home_activated$: Observable<any>


}