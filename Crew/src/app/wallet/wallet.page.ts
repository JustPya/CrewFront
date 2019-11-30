import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, PersonalExpense } from '../models/User';


@Component({
  selector: 'app-wallet',
  templateUrl: 'wallet.page.html',
  styleUrls: ['wallet.page.scss']
})
export class WalletPage {

  data: any;
  user: User;
  numExpenses: number;
  exp: PersonalExpense;
  personalExpenses: Array<PersonalExpense>;

  displayExpenses = false;
  displayExpensesList = false;

  constructor(private userService: UserService) {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
          {
              data: [0, 0, 10],
              backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
              ],
              hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56'
              ]
          }]
      };
  }

  showDialogToAdd() {
    this.displayExpensesList = false;
    this.displayExpenses = true;
  }

  showDialogListExpenses() {
    this.displayExpenses = false;
    this.displayExpensesList = true;
  }

  saveExpense() {
    this.personalExpenses.push(this.exp);
    this.exp = new PersonalExpense();
    this.updateUser(this.personalExpenses);
    this.displayExpenses = false;
    this.numExpenses = this.personalExpenses.length;
    console.log(this.user);

  }

  /**
   * Delete personal expense
   * @param i: Index of selected expense to remove
   */
  deleteExpense(i: number) {
    this.personalExpenses.splice(i, 1);
    this.updateUser(this.personalExpenses);
    this.numExpenses = this.personalExpenses.length;
  }

  /**
   * Update user DB by ID
   */
  updateUser(exp: Array<PersonalExpense>) {
    this.user.personalExpenses = exp;
    this.userService.updateUser(this.user.uID, this.user);
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(data => {
      this.user = data;
    });

    this.personalExpenses = new Array<PersonalExpense>();
    this.numExpenses = this.personalExpenses.length;
    this.exp = new PersonalExpense();
    console.log(this.personalExpenses);

    //this.user = this.userService.globalUser;
   // console.log(this.user);
  }

}
