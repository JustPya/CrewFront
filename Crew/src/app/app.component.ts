import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  name = "Fernanda Moreno";
  public appMenu = [
    {title: 'My Wallet', url: '/tabs/wallet', icon: 'home'},
    {title: 'Contact us', url: '/contact-us', icon: 'mail'},
    {title: 'Settings', url: '/settings', icon: 'settings'},
    {title: 'Friends', url: '/friends', icon: 'contacts'},
    {title: 'Log out', url: '/logout', icon: 'power'}
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  /*
  Method to open Log Out alert
  */
  async presentAlert(title) {
    if(title === 'Log out'){
      const alert = await this.alertController.create({
        header: 'Log out',
        message: 'Are you sure you want to log out?',
        buttons: [{
          text: 'Yes',
          handler: data => {
            console.log("codigo para desloguear");
            
          }
        },
        {
          text: 'No',
        }]
      });
      await alert.present();
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
