import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

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

  constructor(private router: Router,
              private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private firebase: UserService,
              private loadingController: LoadingController) {

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
      ])),
      // confirmPassword: new FormControl('', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(6),
      //   Validators.required
      // ]))
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
      ],
      // confirmPassword: [
      //   { type: 'required', message: 'Field is required.' },
      //   { type: 'pattern', message: 'Your username must contain only numbers and letters.' }
      // ]
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
    const record = {};
    record['Email'] = this.email;
    record['Name'] = this.name;
    this.firebase.createUser(record).then(resp => {
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
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.createRecord();
        this.errorMessage = '';
        this.successMessage = 'Your account has been created. Please log in.';
        this.goLoginPage();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  // Registrar con google en Firebase
  loginGoogle() {
    this.showLoader();
    const record = {};
    if (this.authService.userDetails()) {
      this.email = this.authService.userDetails().email;
      this.name = this.authService.userDetails().displayName;
    }
    record['Email'] = this.email;
    record['Name'] = this.name;
    this.firebase.createUser(record).then(resp => {
      console.log(resp);
      this.hideLoader();
      this.goLoginPage();
    })
      .catch(error => {
        console.log(error);
      });
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
