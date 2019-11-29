import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { QuerysService } from './querys.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private AFauth: AngularFireAuth,
    private router: Router,
    private queryService: QuerysService,
    private dataBase: AngularFirestore) {
  }

  /*
   * From email and password, try to sign in with email an password to firebase.
   */
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          console.log(err);
          if (err.code === 'auth/user-not-found') {
            reject('El correo electrónico no está registrado.');
          } else if (err.code === 'auth/wrong-password') {
            reject('Contraseña Incorrecta.');
          } else {
            reject('Error al iniciar sesión.');
          }
        });
    });
  }


  /*
   * From idToken, try to sign in with credential.
   */
  loginWithCredentials(idToken): Promise<any> {
    return new Promise((resolve, reject) => {
      this.AFauth.auth
        .signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(idToken)
        )
        .then(user => {
          this.userService.updateUserData(user.user, user.user.displayName);
          resolve(user);
        })
        .catch(err => {
          console.log(err);
          reject('Error al iniciar sesión.');
        });
    });
  }

  /**
   * This register in Firebase Autentication an user by email
   * @param email email from register page
   * @param password password from register page
   */
  registerUser(email: string, password: string, name: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            this.userService.updateUserData(user.user, name);
            resolve(user);
          },
          err => reject(err));
    });
  }
  getAFauth(): AngularFireAuth {
    return this.AFauth;
  }

  signOut() {
    return this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
