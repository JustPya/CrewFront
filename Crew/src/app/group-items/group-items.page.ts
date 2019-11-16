import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Expense, Debtor, Participant } from '../models/Group';

@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.page.html',
  styleUrls: ['./group-items.page.scss'],
})
export class GroupItemsPage implements OnInit {
  displayGroup = false;
  displayExpense = false;
  debtor: Debtor;
  description: string;
  numMembers: number;
  total: number;

  expenses: Expense[];
  participants: Participant[];

  constructor(private menu: MenuController) {
   }
   /**
    * Show dialog to show members
    */
  showDialogGroup() {
    this.displayGroup = true;
  }

  /**
   * Show dialog to show CRUD expenses
   */
  showDialogExpenses() {
    this.displayExpense = true;
  }
  
  openMenu() {
    console.log('do some');
    this.menu.open('first');
  }

  ngOnInit() {
    this.description = 'This is a description';
    this.debtor = {
      Name: 'Pya', UID: ''
    };

    this.expenses  = [
      {Name: 'Chelas', Deb: this.debtor, Amount: 2000},
      {Name: 'Papitas', Deb: this.debtor, Amount: 2000},
      {Name: 'Nectar', Deb: this.debtor, Amount: 2000},
      {Name: 'Chelas', Deb: this.debtor, Amount: 2000},
      {Name: 'Papitas', Deb: this.debtor, Amount: 2000},
      {Name: 'Nectar', Deb: this.debtor, Amount: 2000},
      {Name: 'Chelas', Deb: this.debtor, Amount: 2000},
      {Name: 'Papitas', Deb: this.debtor, Amount: 2000},
      {Name: 'Nectar', Deb: this.debtor, Amount: 2000}
    ];

    this.participants = [
      {Name: 'Fernanda', Presupuesto: 350000, UID: 'UIDFer'},
      {Name: 'And', Presupuesto: 550000, UID: 'UIDAnd'},
      {Name: 'Daniel', Presupuesto: 650000, UID: 'UIDDan'},
      {Name: 'David', Presupuesto: 750000, UID: 'UIDDav'},
    ];

    this.numMembers = this.participants.length;
    this.total = 18000;
  }

}
