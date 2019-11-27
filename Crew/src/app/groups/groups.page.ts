import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage {

  constructor(private router: Router) {}

  /*
  Method to navigate to create group
  */
  navigateToCreateGroup() {
    this.router.navigateByUrl('createGroup');
  }

  navigateToGroup() {
    this.router.navigateByUrl('group-items');
  }

}
