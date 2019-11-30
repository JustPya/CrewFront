import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private menu: MenuController, private alertController: AlertController) { }

  openMenu() {
    console.log("do some");
    this.menu.open("first");
  }

  
  ngOnInit() {
  }
  /*
    Method to alert for change the name
  */
      async nameAlert() {
        const alert = await this.alertController.create({
          header: 'Change username',
          message: 'Enter new username',
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
            text: 'SAVE',
          }]
        });
        await alert.present();
      }
/*
    Method to alert for change the password
  */
      async passwordAlert() {
        const alert = await this.alertController.create({
          header: 'Change password',
          message: 'Enter new password',
          inputs: [
            {
              name: 'password',
              type: 'password',
              placeholder: 'Password',
            }
          ],
          buttons: [{
            text: 'CANCEL',
          },
          {
            text: 'SAVE',
          }]
        });
        await alert.present();
      }

}
