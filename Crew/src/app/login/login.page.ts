import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  

  username: string;
  password: string;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private router: Router, public menuCtrl: MenuController) {
    menuCtrl.enable(false, 'first');
   }

 hideShowPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
 }

 goTo() {

  if (this.username == 'pya@gmail.com' && this.password == '123') {
    this.router.navigateByUrl('tabs/wallet');
  }

 }

  hola(){
    setTimeout(() => {
      this.router.navigateByUrl('tabs');
    }, 1000);
  }

  ngOnInit() {
  }

}
