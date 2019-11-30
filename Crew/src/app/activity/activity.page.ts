import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { QuerysService } from '../services/querys.service';
import { GroupService } from '../services/group.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-activity',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage implements OnInit {
  currentUser: User;
  email: string;
  ngOnInit(): void {
  }
  constructor(
    private userService: UserService,
    private groupService: GroupService) {
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
      this.email = data.email;
      console.log(data.uID);
    });
  }

  test() {
  }
}
