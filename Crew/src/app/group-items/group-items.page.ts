import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Expense, Debtor, Participant } from '../models/Group';
import { Friend } from '../models/User';

@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.page.html',
  styleUrls: ['./group-items.page.scss'],
})
export class GroupItemsPage implements OnInit {

  displayToAddMembers = false;
  displayToAddExpenses = false;
  displayExpenses = false;
  displayMembersList = false;

  description: string;
  numMembers: number;
  total: number;
  cols: any[];

  expenses: Array<Expense>;
  participants: Array<Participant>;
  debtors: Array<Debtor>;
  friends: Array<Friend>;

  selectedExp: Expense;
  updateExp: Expense;
  exp: Expense;
  deb: Debtor;
  constructor(private menu: MenuController) {
   }

   /**
    * Show dialog to add members
    */
   showToAddMember() {
    this.displayToAddExpenses = this.displayMembersList = false;
    this.displayToAddMembers = true;
  }

  /**
   * Show dialog to show CRUD expenses
   */
  showDialogToAdd() {
    this.displayToAddMembers = this.displayMembersList = false;
    this.displayToAddExpenses = true;
  }

  /**
   * Show dialog with member list
   */
  showMemberList() {
    this.displayToAddExpenses = this.displayToAddMembers = false;
    this.displayMembersList = true;
  }
  /**
   * @event: Event from primeng table
   */
  onRowSelect(event) {
    this.selectedExp = this.cloneData(event.data);
    this.displayExpenses = true;
  }
  /**
   * Update expense
   */
  updateExpense() {
    const indexExpense = this.expenses.findIndex(f => f.name.toLocaleLowerCase() === this.selectedExp.name.toLocaleLowerCase());
    console.log(indexExpense);
    if (indexExpense !== -1) {
      this.expenses[indexExpense] = this.selectedExp;
    }
    this.displayExpenses = false;
    console.log(this.expenses);
    this.selectedExp = new Expense();
  }
  /**
   * Remove expense
   */
  removeExpense() {
    const indexExpense = this.expenses.findIndex(f => f.name.toLocaleLowerCase() === this.selectedExp.name.toLocaleLowerCase());
    console.log(indexExpense);
    this.expenses.splice(indexExpense, 1);
    this.displayExpenses = false;
  }

  /**
   * Save new expense
   */
  saveExpense() {
    this.exp.deb = new Array<Debtor>();
    this.participants.forEach(f => {
      this.deb = new Debtor(f.name, f.uID);
      this.exp.deb.push(this.deb);
    } );
    const duplicateExp = this.expenses.findIndex(f => f.name.toLocaleLowerCase() == this.exp.name.toLocaleLowerCase());
    if (duplicateExp === -1) {
      this.expenses.push(this.exp);
      this.exp = new Expense();
      this.displayToAddExpenses = false;
    }
  }

  /**
   * @var e: Expense to clone from table event method
   */
  cloneData(e: Expense): Expense {
    const exp = e;
    return exp;
  }

  /**
   * Open main menu
   */
  openMenu() {
    console.log('Open main Menu');
    this.menu.open('first');
  }

  /**
   * @var i: Index of selected member to remove
   */
  deleteMember(i: number) {
    this.participants.splice(i, 1);
    this.expenses.forEach(f => {
      f.deb.splice(i, 1);
    });
    this.numMembers = this.participants.length;
  }

  /**
   * @var i: Index of selected friend to add
   */
  addMember(i: number) {
    const friend = this.friends[i];
    const isMember = this.participants.findIndex(f => f.name.toLocaleLowerCase() == friend.name.toLocaleLowerCase());
    if (isMember === -1) {
      const newParticipant = new Participant(friend.name, friend.uID);
      const newDeb = new Debtor(friend.name, friend.uID);
      this.participants.push(newParticipant);
      this.numMembers = this.participants.length;
      this.displayToAddMembers = false;
      this.expenses.forEach(f => {
        f.deb.push(newDeb);
      });
    }
  }

  ngOnInit() {
    this.cols = [
      { field: 'expense', header: 'Expense' },
      { field: 'amount', header: 'Amount' }
  ];
    this.description = 'This is a description too short but too cute';
    this.friends = new Array<Friend>();
    this.friends = [
      {name: 'Fernanda',  uID: 'UIDFer'},
      {name: 'Andrés',  uID: 'UIDAnd'},
      {name: 'Daniel',  uID: 'UIDDan'},
      {name: 'David',  uID: 'UIDDav'},
      {name: 'Marlon',  uID: 'UIDMar'},
      {name: 'Alejandro',  uID: 'UIDAle'},
      {name: 'Edward',  uID: 'UIDEdw'},
      {name: 'Carlos',  uID: 'UIDCar'},
      {name: 'Johann',  uID: 'UIDJoh'},
    ];

    this.participants = new Array<Participant>();
    this.expenses = new Array<Expense>();
    this.exp = new Expense();
    this.selectedExp = new Expense();
    this.updateExp = new Expense();
    this.numMembers = this.participants.length;
    this.total = 0;
  }
}
