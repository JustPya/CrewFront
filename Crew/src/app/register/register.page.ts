import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  registerForm: FormGroup;
  users: any;

  email: string;
  name: string;

  errorMessage: any;
  successMessage: any;
  loader: any;
  user: User;

  constructor(private router: Router,
              private navCtrl: NavController,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private firebase: UserService,
              private loadingController: LoadingController) {

    this.createFormGroup();
  }

  createFormGroup() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });
    this.errorMessage = {
      name: [
        { type: 'required', message: 'Name is required.' },
      ],
      email: [
        { type: 'required', message: 'Email is required.' },
        { type: 'pattern', message: 'You must provide a valid email.' }
      ],
      password: [
        { type: 'required', message: 'Password is required.' },
        // tslint:disable-next-line: max-line-length
        { type: 'pattern', message: 'Your password must be must be at least 6 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.' }
      ]
    };
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ngOnInit() {
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
  register(value) {
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
      res.onDidDismiss().then((dis) => {
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
