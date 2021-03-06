import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { Group, Participant } from '../models/Group';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {

  /*
  Parameters
  */
  private group: Group;
  private name: string;
  private description: string;
  private date: Date;
  private participants: Array<Participant>;
  private countDescription = 0;
  private countName = 0;

  constructor(
    private menu: MenuController,
    public toastController: ToastController,
    private router: Router,
    private groupService: GroupService,
    private userService: UserService) { }

  ngOnInit() {
    this.date = new Date();
    this.userService.currentUser.subscribe(data => {
      this.participants = [
        new Participant(data.name, data.uID)
      ];
    });
  }
  /*
  Method to open menu
  */
  openMenu() {
    console.log('Open main menu');
    this.menu.open('first');
  }
  /*
  Method to return to groups
  */

  navigateToGroups() {
    this.group = new Group(this.name, this.description, this.date, this.participants);
    this.groupService.createGroup(this.group);
    this.router.navigateByUrl('tabs/groups');
  }
  /*
  Method to increase the description counter and activate the toast.
  */
  async descriptionToast(event) {
    this.countDescription = event.target.value.length;
    if (this.countDescription === 215) {
      const toast = await this.toastController.create({
        message: 'reached the maximum limit of characters for the description',
        duration: 2000
      });
      toast.present();
    }
  }
  /*
  Method to increase the name counter and activate the toast.
  */
  async nameToast(event) {
    this.countName = event.target.value.length;
    if (this.countName === 30) {
      const toast = await this.toastController.create({
        message: 'reached the maximum limit of characters for the name',
        duration: 2000
      });
      toast.present();
    }
  }
}
