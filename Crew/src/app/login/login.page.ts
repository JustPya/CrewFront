import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  loading: any;

  loginForm: FormGroup;
  errorMessage = '';

  constructor(private router: Router,
              public navCtrl: NavController,
              private platform: Platform,
              private google: GooglePlus,
              public loadingController: LoadingController,
              private fireAuth: AngularFireAuth,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService) {

    this.loginForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }


  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }

  async loginGoogle() {
    this.showLoader();
    let params;
    if (this.platform.is('cordova')) {
      params = {
        webClientId: '801441567235-llsbqsmnkri0hklb6587v0oqpqcagr6v.apps.googleusercontent.com',
        offline: true
      };
    } else {
      params = {};
    }
    this.google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response;
        this.onLoginSuccess(idToken, accessToken);
        this.hideLoader();
      }).catch((error) => {
        console.log(error);
        alert('error:' + JSON.stringify(error));
      });
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(['/wallet']);
        this.loading.dismiss();
      });

  }
  onLoginError(err) {
    console.log(err);
  }

  loginEmail(value) {
    this.loading.showLoader();
    this.authService.loginEmail(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.loading.hideLoader();
        this.navCtrl.navigateForward('/wallet');
      }, err => {
        this.errorMessage = err.message;
      });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  showLoader() {
    this.loading = this.loadingController.create({
      message: 'Wait a second...'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }
  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }
}
