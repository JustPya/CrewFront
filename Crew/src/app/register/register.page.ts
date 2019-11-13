import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  passwordType = 'password';
  passwordIcon = 'eye-off';
  registerForm: FormGroup;
  users: any;

  email: string;
  name: string;

  loader: any;
  user: User;

  constructor(private navCtrl: NavController,
              private firebase: UserService,
              private loadingController: LoadingController) {

  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // Crear usuario en base de datos Firebase
  createRecord() {
    this.user = new User(this.email, this.name);
    this.firebase.createUser(this.user).then(resp => {
      this.hideLoader();
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  // Registrar con correo electronico en Firebase
  register() {
    this.showLoader();
    // this.authService.registerUser(value)
    //   .then(res => {
    //     this.createRecord();
    //     this.goLoginPage();
    //   }, err => {
    //     console.log(err);
    //   });
  }
  showLoader() {
    this.loader = this.loadingController.create({
      message: 'Wait a second...'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then(() => {
        console.log('Loading dismissed!');
      });
    });
  }
  hideLoader() {
    this.loadingController.dismiss();
  }
  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

}
