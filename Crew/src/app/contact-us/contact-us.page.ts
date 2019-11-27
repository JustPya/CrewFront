import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(private menu: MenuController) { }

  openMenu() {
    console.log('Open main menu');
    this.menu.open('first');
  }
  ngOnInit() {
  }

}
