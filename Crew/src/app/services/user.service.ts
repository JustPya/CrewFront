import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }


  createUser(record) {
    return this.firestore.collection('Users').add(record);
  }

  readUser() {
    return this.firestore.collection('Users').snapshotChanges();
  }

  updateUser(recordID, record) {
    this.firestore.doc('Users/' + recordID).update(record);
  }

  deleteUser(record) {
    this.firestore.doc('Users/' + record).delete();
  }
}
