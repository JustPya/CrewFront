import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  subject: string;
  body: string;
  to: string;

  constructor(private menu: MenuController, private emailComposer: EmailComposer) { }

  openMenu() {
    console.log('Open main menu');
    this.menu.open('first');
  }

  sendEmail() {
    const email = {
      to: this.to,
      cc: [],
      bcc: [],
      attachment: [],
      subject: this.subject,
      body: this.body,
      isHtml: false,
      app: 'Gmail'
    };
    this.emailComposer.open(email);
    console.log(this.body);
  }

  ngOnInit() {
    this.subject = 'Subject';
    this.body = '';
    this.to = 'danielmartinezdmr@gmail.com';
  }

}
