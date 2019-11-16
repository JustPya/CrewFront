import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }


  /** CRUD for User section
   * recordId: User Id being modified
   * record: User data that will reeplaze recordId document
   */
  createUser(recordId) {
    return this.firestore.collection('Users').add(JSON.parse(JSON.stringify(recordId)));
  }
  readUser() {
    return this.firestore.collection('Users').snapshotChanges();
  }
  updateUser(recordID, record) {
    this.firestore.doc('Users/' + recordID).update(JSON.parse(JSON.stringify(record)));
  }
  deleteUser(recordId) {
    this.firestore.doc('Users/' + recordId).delete();
  }

  /** CRUD for Friend section
   * userId: User Id being modified
   * recordId: Friend Id being modified
   * record: Friend data that will reeplaze recordId document
   */
  createFriend(recordId, record) {
    return this.firestore.collection('Users/' + recordId + '/Friends').add(JSON.parse(JSON.stringify(record)));
  }
  readFriend(userId, recordId) {
    return this.firestore.doc('Users/' + userId + '/Friends/' + recordId).snapshotChanges();
  }
  updateFriend(userId, recordId, record) {
    this.firestore.doc('Users/' + userId + '/Friends' + recordId).update(JSON.parse(JSON.stringify(record)));
  }
  deleteFriend(userId, recordId) {
    this.firestore.doc('Users/' + userId + '/Friends' + recordId.delete());
  }

  /** CRUD for Personal Expense section
   * userId: User Id being modified
   * recordId: Expense Id being modified
   * record: Expense data that will reeplaze recordId document
   */
  createExpense(record, recordId) {
    return this.firestore.collection('Users/' + recordId + '/Expenses').add(JSON.parse(JSON.stringify(record)));
  }
  readExpense(userId, recordId) {
    return this.firestore.collection('Users/' + userId + '/Expenses/' + recordId).snapshotChanges();
  }
  updateExpense(userId, recordId, record) {
    this.firestore.doc('Users/' + userId + '/Expenses' + recordId).update(JSON.parse(JSON.stringify(record)));
  }
  deleteExpense(userId, recordId) {
    this.firestore.doc('Users/' + userId + '/Expenses' + recordId.delete());
  }
}
