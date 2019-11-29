import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { User } from './models/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  currentUser: User;
  name: string;
  public appMenu = [
    { title: 'My Wallet', url: '/tabs/wallet', icon: 'home' },
    { title: 'Contact us', url: '/contact-us', icon: 'mail' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
    { title: 'Friends', url: '/friends', icon: 'contacts' },
    { title: 'Log out', url: '', icon: 'power' }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.initializeApp();
    this.userService.currentUser.subscribe( data => {
      this.currentUser = data;
      this.name = data.name;
    });
  }

  /*
  Method to open Log Out alert
  */
  async presentAlert(title) {
    if (title === 'Log out') {
      const alert = await this.alertController.create({
        header: 'Log out',
        message: 'Are you sure you want to log out?',
        buttons: [{
          text: 'Yes',
          handler: data => {
            this.authService.signOut();
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
