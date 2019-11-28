import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { QuerysService } from '../services/querys.service';


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
  password: string;
  loader: any;
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController,
    private userService: UserService,
    private loadingController: LoadingController,
    private queryService: QuerysService) {

  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ngOnInit() {
  }

  /**
   * This method register an authenticate user in Firebase authentication
   */
  registerUser() {
    this.showLoader();
    this.authService.registerUser(this.email, this.password).then(resp => {
      this.goLoginPage();
      this.hideLoader();
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
        this.hideLoader();
      });
  }
  /**
   * Creat user in Firestore database, and then goes to login
   */
  createRecord() {
    this.user = new User(this.email, this.name);
    this.userService.createUser(this.user).then(resp => {
      this.hideLoader();
      console.log(resp);
      this.navCtrl.navigateRoot('');
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
