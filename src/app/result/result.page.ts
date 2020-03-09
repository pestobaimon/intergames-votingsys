import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ParticipantService } from '../../providers/participant.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  list: unknown[];

  data: any;
  constructor(
    private afs: AngularFirestore,
    private participantService: ParticipantService
  ) { }

  // private data;
  private snap;
  private names;
  private retrive:boolean = false;

  ngOnInit() {
    
    this.afs.collection('participants').snapshotChanges()
    .subscribe(actionArray => {
      this.list = actionArray.map(item => {
      console.log(item.payload.doc.data())
      this.retrive = true
      return item.payload.doc.data() as unknown
      })
    })

  }

  getResult() {
    // this.afs.collection("participants").doc().get()
    // .subscribe(doc => {
    //   if (!doc.exists) {
    //     console.log('No such document!');
    //   } else {
    //     console.log('Document data:', doc.data());
    //   }
    // })

    // this.afs.collection('participants').get()
    // .subscribe((snapshot) => {
    //   // console.log(snapshot.docs)
    //   this.snap = snapshot
    //   this.data = snapshot.docs.forEach(doc => {
    //     console.log(doc.data())
    //     return doc.data()
    //     return this.data
    //     console.log(this.names)
    //   })
    // })

    // this.afs.collection('participants').valueChanges()
    // .subscribe(data => {
    //   if(data) {
    //     this.names = data['name']
    //     console.log(data)
    //     console.log(this.names)
    //   }
    // })
    // .subscribe((snapshot => {
    //   console.log(snapshot)
    //   this.snap = snapshot
    // }))

  }
}
