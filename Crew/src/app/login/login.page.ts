import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private authService: AuthService,
    private router: Router,
    public menuCtrl: MenuController
  ) {
    menuCtrl.enable(false, 'first');
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  goTo() {
    console.log(this.username, this.password);
    this.authService
      .login(this.username, this.password)
      .then(res => {
        this.router.navigateByUrl('/tabs');
        this.menuCtrl.enable(true, 'first');
        console.log(res);
      })
      .catch(err => {
        console.log('Error');
        console.log(err);
      });
  }
  ngOnInit() {}
}
