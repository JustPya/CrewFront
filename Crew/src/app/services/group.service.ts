import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private firestore: AngularFirestore) { }


  createUser(record) {
    return this.firestore.collection('Group').add(record);
  }

  readUser() {
    return this.firestore.collection('Group').snapshotChanges();
  }

  updateUser(recordID, record) {
    this.firestore.doc('Group/' + recordID).update(record);
  }

  deleteUser(record) {
    this.firestore.doc('Group/' + record).delete();
  }
}
