import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from '../models/Group';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-groups',
  templateUrl: 'groups.page.html',
  styleUrls: ['groups.page.scss']
})
export class GroupsPage {
  ids: Map<string, Group> = new Map();
  groups: Group[] = [];
  constructor(
    private router: Router,
    private userService: UserService,
    private groupService: GroupService) {


/**
 * This suscribe to a document Reference to Group, and loop 
 * over the snapshots(Results), and then push each object into 
 * a group array an set the id in the map
 */
    this.groupService.readAllGroups().subscribe(data => {
      data.map(a => {
        const id = a.payload.doc.id;
        const groupData = a.payload.doc.data() as Group;
        this.ids.set(id, groupData);
        const group = new Group(groupData.name, groupData.description);
        this.groups.push(group);
      });
    });
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
