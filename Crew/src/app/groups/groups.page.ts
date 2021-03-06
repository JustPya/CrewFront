import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  ids: Map<Group, string> = new Map();
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
    this.groupService.readGroupsByUser().subscribe(data => {
      this.groups = [];
      data.map(a => {
        const id = a.payload.doc.id;
        const groupData = a.payload.doc.data() as Group;
        if (groupData.participants) {
          groupData.participants.forEach(participant => {
            if (participant.uID === userService.globalUser.uID) {
              const item = new Group(groupData.name, groupData.description, groupData.date, groupData.participants);
              this.ids.set(item, id);
              this.groups.push(item);
            }
          });
        }
      });
    });
  }

  /*
  Method to navigate to create group
  */
  navigateToCreateGroup() {
    this.router.navigateByUrl('createGroup');
  }

  navigateToGroup(group: Group) {
    console.log(this.ids.get(group));
    this.router.navigate(['group-items', this.ids.get(group)]);
  }

}
