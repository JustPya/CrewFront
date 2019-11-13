import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, Platform } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import * as firebase from "firebase/app";



import { AuthService } from '../services/auth.service';

import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { isNullOrUndefined } from "util";

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
    public menuCtrl: MenuController,
    public toastController: ToastController,
    private gplus: GooglePlus,
    private platform: Platform
  ) {
    menuCtrl.enable(false, 'first');
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  /*
   * Sign in with Email
   */
  loginWithEmail() {
    console.log(this.username, this.password);
<<<<<<< HEAD
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
=======
    if (isNullOrUndefined(this.username) || isNullOrUndefined(this.password)) {
      this.presentToast("Hay campos vaccios");
    } else {
      this.authService
        .login(this.username, this.password)
        .then(res => {
          this.router.navigateByUrl("/tabs");
          this.menuCtrl.enable(true, "first");
          console.log(res);
        })
        .catch(err => {
          this.presentToast(err);
        });
    }
  }

  /*
   * Sign in with Google
   */
  loginWithGoogle() {
      this.webGoogleLogin().then(res => {
        this.router.navigateByUrl("/tabs");
        this.menuCtrl.enable(true, "first");
      });
  }

  async nativeGoogleLogin():Promise<void> {
    try {
      const gplusUser = await this.gplus.login({
        webClientId:
          "801441567235-llsbqsmnkri0hklb6587v0oqpqcagr6v.apps.googleusercontent.com",
        offline: true,
        scopes: "profile email"
      });
      
      return await this.authService.loginWithCredentials(gplusUser.idToken);
    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.authService
        .getAFauth()
        .auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

>>>>>>> c4a167b836b69bfb664445b2a186f691965d6ccc
  ngOnInit() {}
}
