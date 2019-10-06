import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  constructor(private menu: MenuController) { }

  openMenu(){
    console.log("do some");
    this.menu.open("first");
  }
  ngOnInit() {
  }

}
