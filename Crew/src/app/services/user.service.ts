import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User, PersonalExpense, Friend } from '../models/User';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Group } from '../models/Group';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  globalUser: User;
  currentUser: Observable<User>;
  constructor(
    private AFauth: AngularFireAuth,
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
    this.currentUser.subscribe(data => {
      this.globalUser = data;
    });
  }
  /** CRUD for User section
   * recordId: User Id being modified
   * record: User data that will reeplaze recordId document
   */
  createUser(recordId) {
    return this.dataBase.collection('Users').add(JSON.parse(JSON.stringify(recordId)));
  }
  readUser() {
    return this.dataBase.collection('Users').snapshotChanges();
  }
  updateUser(recordID, record) {
    this.dataBase.doc('Users/' + recordID).update(JSON.parse(JSON.stringify(record)));
  }
  deleteUser(recordId) {
    this.dataBase.doc('Users/' + recordId).delete();
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
      friends: new Array<Friend>(),
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
  createFriend(friendEmail: string) {
    this.dataBase.firestore.collection('Users').where('email', '==', friendEmail).get().then(data => {
      if (this.globalUser.friends.length > 0) {
        this.globalUser.friends.forEach(friend => {
          if (friend.uID === data.docs[0].data().uID) {
            return;
          }
          const info = data.docs[0].data();
          this.globalUser.friends.push({ name: info.name, uID: info.uID });
          this.updateFriend(this.globalUser.uID, this.globalUser);
        });
      } else {
        const info = data.docs[0].data();
        this.globalUser.friends.push({ name: info.name, uID: info.uID });
        this.updateFriend(this.globalUser.uID, this.globalUser);
      }
    });
  }
  readFriend(userId, recordId) {
    return this.dataBase.doc('Users/' + userId + '/Friends/' + recordId).snapshotChanges();
  }
  updateFriend(userId, record) {
    this.dataBase.doc('Users/' + userId).update(record);
  }
  deleteFriend(userId, friend) {
    this.dataBase.doc('Users/' + userId).update({
      friends: firestore.FieldValue.arrayRemove(friend)
    });
  }

  /** CRUD for Personal Expense section
   * userId: User Id being modified
   * recordId: Expense Id being modified
   * record: Expense data that will reeplaze recordId document
   */
  createExpense(record, recordId) {
    return this.dataBase.collection('Users/' + recordId + '/Expenses').add(JSON.parse(JSON.stringify(record)));
  }
  readExpense(userId, recordId) {
    return this.dataBase.collection('Users/' + userId + '/Expenses/' + recordId).snapshotChanges();
  }
  updateExpense(userId, recordId, record) {
    this.dataBase.doc('Users/' + userId + '/Expenses' + recordId).update(JSON.parse(JSON.stringify(record)));
  }
  deleteExpense(userId, recordId) {
    this.dataBase.doc('Users/' + userId + '/Expenses' + recordId.delete());
  }
}
