import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private AFauth: AngularFireAuth) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          console.log(err);
          if (err.code == 'auth/user-not-found') {
            reject('El correo electrónico no está registrado.');
          } else if (err.code == 'auth/wrong-password') {
            reject('Contraseña Incorrecta.')  ;
          } else {
            reject('Error al iniciar sesión.');
          }
        });
    });
  }

  getAFauth(): AngularFireAuth{
    return this.AFauth;
  }
}

