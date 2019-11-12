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
    return this.firestore.collection('Group').add(recordId);
  }

  readGroup(recordId) {
    return this.firestore.doc('Group/' + recordId).snapshotChanges();
  }

  updateGroup(recordID, record) {
    this.firestore.doc('Group/' + recordID).update(record);
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
    return this.firestore.collection('Group/' + groupId + '/Participants').add(recordId);
  }

  readParticipant(groupId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Participants/' + recordId).snapshotChanges();
  }

  updateParticipant(groupId, recordId, record) {
    return this.firestore.doc('Group/' + groupId + '/Participants/' + recordId).update(record);
  }

  deleteParticipant(groupId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Participants/' + recordId).delete;
  }

  /** CRUD for expense section
   * recordId: Expense Id being modified
   * record: Expense data that will reeplaze recordId document
   */
  createExpense(groupId, recordId) {
    return this.firestore.collection('Group/' + groupId + '/Expenses').add(recordId);
  }

  readExpense(groupId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + recordId).snapshotChanges();
  }

  updateExpense(groupId, recordId, record) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + recordId).update(record);
  }

  deleteExpense(groupId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + recordId).delete;
  }
  /** CRUD for Debtor section
   * recordId: Debtor Id being modified
   * record: Debtor data that will reeplaze recordId document
   */
  createDebtor(groupId, expenseId, recordId) {
    return this.firestore.collection('Group/' + groupId + '/Expenses/' + expenseId + '/Debtor/').add(recordId);
  }

  readDebtor(groupId, debtorId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + debtorId + '/Debtor/' + recordId).snapshotChanges();
  }

  updateDeptor(groupId, debtorId, recordId, record) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + debtorId + '/Debtor/' + recordId).update(record);
  }

  deleteDeptor(groupId, debtorId, recordId) {
    return this.firestore.doc('Group/' + groupId + '/Expenses/' + debtorId + '/Debtor/' + recordId).delete();
  }
}
