import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private router: Router, public menuCtrl: MenuController) {
    menuCtrl.enable(false, 'first');
   }

 hideShowPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
 }


  hola(){
    setTimeout(() => {
      this.router.navigateByUrl('tabs');
    }, 1000);
  }

  ngOnInit() {
  }

}
