import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Tab3Page } from './tab3/tab3.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  name = "Fernanda Moreno";
  rootPage = Tab3Page;
  public appMenu = [
    {title: 'Home', url: '/tabs/tab3', icon: 'home'},
    {title: 'Contact us', url: '/contactUs', icon: 'mail'},
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
