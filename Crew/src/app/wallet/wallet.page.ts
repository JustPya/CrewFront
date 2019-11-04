import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: 'wallet.page.html',
  styleUrls: ['wallet.page.scss']
})
export class WalletPage implements OnInit {

  userEmail: string;

  constructor(private authService: AuthenticationService,
              private navCtrl: NavController,
              private menu: MenuController) { }


  ngOnInit() {
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack('');
    }
  }
  openMenu() {
    this.menu.open('first');
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }

}
