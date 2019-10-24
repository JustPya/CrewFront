import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private menu: MenuController, private router: Router) {
    menu.enable(true, 'first');
  }

  openMenu() {
    console.log("do some");
    this.menu.open("first");
  }
}
