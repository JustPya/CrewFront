import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  
  friendName: string;

  /*
    Example of friends
  */
  friends = [] = [{imag:'https://www.biodiversidad.gob.mx/assets/images/recursos/bdi/02.jpg', name: 'Camila'},
  {imag:'https://ep01.epimg.net/elpais/imagenes/2018/12/14/album/1544777592_679099_1544990800_noticia_normal.jpg', name: 'Julian'},
  {imag:'https://www.biodiversidad.gob.mx/assets/images/recursos/bdi/02.jpg', name: 'Eduardo'},
  {imag:'https://www.biodiversidad.gob.mx/assets/images/recursos/bdi/02.jpg', name: 'Camila'},
  {imag:'https://ep01.epimg.net/elpais/imagenes/2018/12/14/album/1544777592_679099_1544990800_noticia_normal.jpg', name: 'Julian'},
  {imag:'https://www.biodiversidad.gob.mx/assets/images/recursos/bdi/02.jpg', name: 'Eduardo'},
  {imag:'https://www.biodiversidad.gob.mx/assets/images/recursos/bdi/02.jpg', name: 'Camila'},
  {imag:'https://ep01.epimg.net/elpais/imagenes/2018/12/14/album/1544777592_679099_1544990800_noticia_normal.jpg', name: 'Julian'},
  {imag:'https://www.biodiversidad.gob.mx/assets/images/recursos/bdi/02.jpg', name: 'Eduardo'}
]



constructor(private menu: MenuController, public alertController: AlertController) { }
  /*
  Method to open menu
  */
  openMenu() {
    console.log("do some");
    this.menu.open("first");
  }
            ngOnInit() {
              
            }
  /*
    Method to open alert and add friends
  */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Add friend',
      message: 'Enter username you want to add',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username',
        }
      ],
      buttons: [{
        text: 'CANCEL',
      },
      {
        text: 'ADD',
        handler: data => {
          if(data.username!=null && data.username!=''){
            this.friendName = data.username;
          }
          else{
            this.presentAlert();
          }
        }
      }]
    });
    await alert.present();
  }
  
  /*
    Method to delete friends
  */
  deleteFriend(i){
    delete this.friends[i];
  }

  /*
    Method of search
  */
  search(event) {
    const query = event.target.value.toLowerCase();
    /*
      Insert search method
    */
  }





}
