import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Expense, Debtor, Participant, Group } from '../models/Group';
import { Friend, User } from '../models/User';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { GroupService } from '../services/group.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.page.html',
  styleUrls: ['./group-items.page.scss'],
})
export class GroupItemsPage implements OnInit {

  group: Group;
  currentUser: User;
  id: string;

  displayToAddMembers = false;
  displayToAddExpenses = false;
  displayExpenses = false;
  displayMembersList = false;

  description: string;
  groupName: string;
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
  constructor(
    private menu: MenuController,
    private router: ActivatedRoute,
    private groupService: GroupService,
    private userService: UserService) {
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
      this.updateGroupDB(this.participants, this.expenses);
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
    this.updateGroupDB(this.participants, this.expenses);
  }

  /**
   * Save new expense
   */
  saveExpense() {
    this.exp.deb = new Array<Debtor>();
    this.participants.forEach(f => {
      this.deb = new Debtor(f.name, f.uID);
      this.exp.deb.push(this.deb);
    });
    console.log(this.expenses);
    const duplicateExp = this.expenses.findIndex(f => f.name.toLocaleLowerCase() == this.exp.name.toLocaleLowerCase());
    if (duplicateExp === -1) {
      this.expenses.push(this.exp);
      this.exp = new Expense();
      this.displayToAddExpenses = false;
      this.updateGroupDB(this.participants, this.expenses);
    }
  }

  /**
   * @param e: Expense to clone from table event method
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
   * @param i: Index of selected member to remove
   */
  deleteMember(i: number) {
    this.participants.splice(i, 1);
    this.expenses.forEach(f => {
      f.deb.splice(i, 1);
    });
    this.updateGroupDB(this.participants, this.expenses);
    this.numMembers = this.participants.length;
  }

  /**
   * @param i: Index of selected friend to add
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
      this.updateGroupDB(this.participants, this.expenses);
    }
  }
  /**
   * Update group DB by ID
   */
  updateGroupDB(par: Array<Participant>, exp: Array<Expense>) {
    this.group.participants = par;
    this.group.expenses = exp;
    this.groupService.updateGroup(this.id, this.group);
  }

  ngOnInit() {
    this.friends = new Array<Friend>();
    this.participants = new Array<Participant>();
    this.expenses = new Array<Expense>();
    this.exp = new Expense();
    this.selectedExp = new Expense();
    this.updateExp = new Expense();
    this.total = 0;
    this.id = this.router.snapshot.paramMap.get('id');

    this.router.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.groupService.readGroup(params.get('id'))
      )
      ).subscribe(data => {
        console.log(data);
        /*Aca hay que asignar los datos al objeto local, ya se traen desde el servicio*/
        this.group = new Group(data.name, data.description, data.date, data.participants);
        this.group.expenses = data.expenses;
        this.group.participants = data.participants;

        this.description = this.group.description;
        this.groupName = this.group.name;
        this.expenses = this.group.expenses;
        this.participants = this.group.participants;
        this.numMembers = this.participants.length;
    });

    this.cols = [
      { field: 'expense', header: 'Expense' },
      { field: 'amount', header: 'Amount' }
    ];

    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
      this.friends = data.friends;
    });
  }
}
