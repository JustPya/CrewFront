import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { isNullOrUndefined } from 'util';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  loader: any;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    public menuCtrl: MenuController,
    public toastController: ToastController,
    private gplus: GooglePlus,
    private loadingController: LoadingController
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
    if (isNullOrUndefined(this.username) || isNullOrUndefined(this.password)) {
      this.presentToast('Hay campos vacios');
    } else {
      this.showLoader();
      this.authService
        .login(this.username, this.password)
        .then(res => {
          this.router.navigateByUrl('/tabs');
          this.menuCtrl.enable(true, 'first');
          console.log(res);
          this.hideLoader();
        })
        .catch(err => {
          this.presentToast(err);
          this.hideLoader();
        });
    }
  }

  /*
   * Sign in with Google
   */
  loginWithGoogle() {
    this.showLoader();
    this.webGoogleLogin().then(res => {
      this.router.navigateByUrl('/tabs');
      this.menuCtrl.enable(true, 'first');
    });
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      this.hideLoader();
      const gplusUser = await this.gplus.login({
        webClientId:
          '801441567235-llsbqsmnkri0hklb6587v0oqpqcagr6v.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });

      this.userService.updateUserData(gplusUser.idToken.user, gplusUser.idToken.user.displayName);
      return await this.authService.loginWithCredentials(gplusUser.idToken);
    } catch (err) {
      this.hideLoader();
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.authService
        .getAFauth()
        .auth.signInWithPopup(provider);
      this.userService.updateUserData(credential.user, credential.user.displayName);
      this.hideLoader();
    } catch (err) {
      this.hideLoader();
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

  ngOnInit() { }

  /**
   * Create loader for waiting response from service
   */
  showLoader() {
    this.loader = this.loadingController.create({
      message: 'Wait a second...'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

  /**
   * Dismiss loader when service on complete
   */
  hideLoader() {
    this.loadingController.dismiss();
  }
}
