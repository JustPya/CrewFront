import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Friend, User } from '../models/User';
import { UserService } from '../services/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from 'querystring';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  friendName: string;

  /*
    Example of friends
  */
  currentUser: User;
  friends: Friend[] = [];


  constructor(
    private menu: MenuController,
    private alertController: AlertController,
    private userService: UserService) { }
  /*
  Method to open menu
  */
  openMenu() {
    console.log('do some');
    this.menu.open('first');
  }
  ngOnInit() {
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
      this.friends = data.friends;
      console.log(this.friends);
    });
  }
  /*
    Method to open alert and add friends
  */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add friend',
      message: 'Enter username you want to add',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username',
        }
      ],
      buttons: [{
        text: 'CANCEL',
      },
      {
        text: 'ADD',
        handler: data => {
          if (data.username != null && data.username !== '') {
            this.addFriend(data.username);
            this.friendName = data.username;
          } else {
            this.presentAlert();
          }
        }
      }]
    });
    await alert.present();
  }


  addFriend(user: string) {
    this.userService.createFriend(user);
  }
  /*
    Method to delete friends
  */
  deleteFriend(i: string | number) {
    this.userService.deleteFriend(this.currentUser.uID, this.friends[i]);
  }

  /*
    Method of search
  */
  search(event) {
    const query = event.target.value.toLowerCase();
    /*
      Insert search method
    */
  }
}
