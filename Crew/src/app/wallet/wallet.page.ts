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

  displayExpenses = false;
  displayExpensesList = false;
  personalExpenses: Array<PersonalExpense>;

  constructor(private userService: UserService) {

    console.log(this.user);


    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      };
  }

  showDialogToAdd() {
    this.displayExpenses = true;
  }

  showDialogListExpenses() {
    this.displayExpensesList = true;
  }

  showExpenses() {
    console.log('holi');
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(data => {
      this.user = data;
    });

    this.numExpenses = 0;

    //this.user = this.userService.globalUser;
   // console.log(this.user);
  }

}
