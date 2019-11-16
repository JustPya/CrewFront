import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private firestore: AngularFirestore) { }


  /** CRUD for Group section
   * recordId: Group Id being modified
   * record: Group data that will reeplaze recordId document
   */
  createGroup(recordId) {
    return this.firestore.collection('Group').add(JSON.parse(JSON.stringify(recordId)));
  }

  readGroup(recordId) {
    return this.firestore.doc('Group/' + recordId).snapshotChanges();
  }

  updateGroup(recordID, record) {
    this.firestore.doc('Group/' + recordID).update(JSON.parse(JSON.stringify(record)));
  }

  deleteGroup(record) {
    this.firestore.doc('Group/' + record).delete();
  }

  /** CRUD for participant section
   * groupId: Group Id being modified
   * recordId: Participant Id being modified
   * record: Participant data that will reeplaze recordId document
   */
  createParticipant(groupId, recordId) {
    return this.firestore.collection('Group/' + groupId + '/Participants').add(JSON.parse(JSON.stringify(recordId)));
  }

  readParticipant(groupId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Participants/' + recordId).snapshotChanges();
  }

  updateParticipant(groupId, recordId, record) {
    return this.firestore.doc('Group/' + groupId + '/Participants/' + recordId).update(JSON.parse(JSON.stringify(record)));
  }

  deleteParticipant(groupId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Participants/' + recordId).delete;
  }

  /** CRUD for expense section
   * recordId: Expense Id being modified
   * record: Expense data that will reeplaze recordId document
   */
  createExpense(groupId, recordId) {
    return this.firestore.collection('Group/' + groupId + '/Expenses').add(JSON.parse(JSON.stringify(recordId)));
  }

  readExpense(groupId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + recordId).snapshotChanges();
  }

  updateExpense(groupId, recordId, record) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + recordId).update(JSON.parse(JSON.stringify(record)));
  }

  deleteExpense(groupId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + recordId).delete;
  }
  /** CRUD for Debtor section
   * recordId: Debtor Id being modified
   * record: Debtor data that will reeplaze recordId document
   */
  createDebtor(groupId, expenseId, recordId) {
    return this.firestore.collection('Group/' + groupId + '/Expenses/' + expenseId + '/Debtor/').add(JSON.parse(JSON.stringify(recordId)));
  }

  readDebtor(groupId, debtorId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + debtorId + '/Debtor/' + recordId).snapshotChanges();
  }

  updateDeptor(groupId, debtorId, recordId, record) {
    // tslint:disable-next-line: max-line-length
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + debtorId + '/Debtor/' + recordId).update(JSON.parse(JSON.stringify(record)));
  }

  deleteDeptor(groupId, debtorId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + debtorId + '/Debtor/' + recordId).delete();
  }
}
