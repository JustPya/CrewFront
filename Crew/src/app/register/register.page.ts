import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  passwordType = 'password';
  passwordIcon = 'eye-off';
  users: any;
  email: string;
  name: string;
  loader: any;
  user: User;

  constructor(private router: Router,
              private navCtrl: NavController,
              private firebase: UserService,
              private loadingController: LoadingController) {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ngOnInit() {
  }

  /**
   * Crear usuario en base de datos Firebase
   */
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
  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

}
