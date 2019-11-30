import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, PersonalExpense } from '../models/User';
import { Group } from '../models/Group';
import { GroupService } from '../services/group.service';
import { group } from '@angular/animations';


@Component({
  selector: 'app-wallet',
  templateUrl: 'wallet.page.html',
  styleUrls: ['wallet.page.scss']
})
export class WalletPage implements OnInit {

  data: any;
  user: User;
  numExpenses: number;
  exp: PersonalExpense;
  pExpenses: number;
  groupsE: number;
  personalExpenses: Array<PersonalExpense>;
  groups: Group[];

  displayExpenses = false;
  displayExpensesList = false;

  constructor(
    private userService: UserService,
    private groupService: GroupService) {
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
    this.updateChart();
  }

  /**
   * Update Chart
   */
  updateChart() {
    this.pExpenses = 0;
    this.personalExpenses.forEach(f => {
      this.pExpenses += f.amount;
    });
    this.drawChart(this.pExpenses, this.groupsE, 10);
  }

  /**
   * Draw Chart
   */
  drawChart(a: number, b: number, c: number) {
    this.data = {
      labels: ['P. Expenses', 'Groups E'],
      datasets: [
          {
              data: [a, b],
              backgroundColor: [
                  '#FF6384',
                  '#36A2EB'
              ],
              hoverBackgroundColor: [
                  '#FF6384',
                  '#36A2EB'
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
    console.log(this.personalExpenses);

    this.groupService.readGroupsByUser().subscribe(data => {
      this.groups = [];
      data.map(a => {
        const groupData = a.payload.doc.data() as Group;
        if (groupData.participants) {
          groupData.participants.forEach(participant => {
            if (participant.uID === this.userService.globalUser.uID) {
              const item = new Group(groupData.name, groupData.description, groupData.date, groupData.participants);
              this.groups.push(item);
            }
          });
          this.groupsE = 0;
          this.groups.forEach(groupItem => {
            groupItem.participants.forEach(item => {
              if (item.uID === this.userService.globalUser.uID) {
                this.groupsE += item.budget;
                this.updateChart();
              }
            });
          });
        }
      });
    });
  }
}
