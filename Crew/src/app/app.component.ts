import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
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
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
