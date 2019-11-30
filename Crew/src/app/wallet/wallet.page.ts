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
  pExpenses: number;
  groupsE: number;
  personalExpenses: Array<PersonalExpense>;

  displayExpenses = false;
  displayExpensesList = false;

  constructor(private userService: UserService) {
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
    this.updateChart();
  }

  /**
   * Update Chart
   */
  updateChart() {
    this.pExpenses = 0;
    this.personalExpenses.forEach(f =>{
      this.pExpenses += f.amount;
    });
    this.drawChart(this.pExpenses, 20, 10);
  }

  /**
   * Draw Chart
   */
  drawChart(a: number, b: number, c: number) {
    this.data = {
      labels: ['P. Expenses', 'Groups E', 'C'],
      datasets: [
          {
              data: [a, b, c],
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
      this.personalExpenses = data.personalExpenses;
      this.numExpenses = data.personalExpenses.length;
      this.updateChart();
    });

    this.personalExpenses = new Array<PersonalExpense>();
    this.numExpenses = this.personalExpenses.length;
    this.exp = new PersonalExpense();
  }

}
