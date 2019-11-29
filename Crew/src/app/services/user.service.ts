import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User, Friend, PersonalExpense } from '../models/User';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Group, Expense } from '../models/Group';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  currentUser: Observable<User>;
  constructor(
    private AFauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private dataBase: AngularFirestore) {
    this.currentUser = this.AFauth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.dataBase.doc<User>(`Users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
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
  /**
   * This sets user data to firestore in login
   * @param user This to get the autenticated user id
   */
  updateUserData(user, nameUser: string) {
    const userRef = this.dataBase.doc<any>(`Users/${user.uid}`);
    const data: User = {
      uID: user.uid,
      email: user.email,
      name: nameUser,
      friends:
        [{ name: 'Daniel', uID: '1234' }, { name: 'David', uID: '2134' },
        { name: 'Fernanda', uID: '3124' }, { name: 'Andres', uID: '4123' }],
      groups: new Array<Group>(),
      personalExpenses: new Array<PersonalExpense>(),
      phone: 0
    };
    console.log(data);
    return userRef.set(data, { merge: true });
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
  deleteFriend(userId, friend) {
    this.firestore.doc('Users/' + userId).update({
      friends: firestore.FieldValue.arrayRemove(friend)
    });
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
