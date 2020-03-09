import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getCollection() {
    return this.afs.collection('particaipants')
  }
  
}
