import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }


  // CRUD Section for User
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

  // CRUD Section for Friend
  createFriend(record, recordId) {
    return this.firestore.collection('Users/' + recordId + '/Friends').add(record);
  }
  readFriend(userId, recordId) {
    return this.firestore.doc('Users/' + userId + '/Friends/' + recordId).snapshotChanges();
  }
  updateFriend(userId, record, recordId) {
    this.firestore.doc('Users/' + userId + '/Friends' + recordId).update(record);
  }
  deleteFriend(userId, record) {
    this.firestore.doc('Users/' + userId + '/Friends' + record.delete());
  }

  // CRUD Section for Personal Expense
  createExpense(record, recordId) {
    return this.firestore.collection('Users/' + recordId + '/Expenses').add(record);
  }
  readExpense(userId, recordId) {
    return this.firestore.collection('Users/' + userId + '/Expenses/' + recordId).snapshotChanges();
  }
  updateExpense(userId, record, recordId) {
    this.firestore.doc('Users/' + userId + '/Expenses' + recordId).update(record);
  }
  deleteExpense(userId, record) {
    this.firestore.doc('Users/' + userId + '/Expenses' + record.delete());
  }
}
