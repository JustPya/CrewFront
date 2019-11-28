import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from '../models/Group';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage {

  groups;
  constructor(
    private router: Router,
    private userService: UserService,
    private groupService: GroupService) {

    this.groups = this.groupService.readAllGroups();

  }

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
