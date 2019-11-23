import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { resolve } from "url";
import { reject } from "q";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private AFauth: AngularFireAuth) {}

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
          if (err.code == "auth/user-not-found") {
            reject("El correo electrónico no está registrado.");
          } else if (err.code == "auth/wrong-password") {
            reject("Contraseña Incorrecta.");
          } else {
            reject("Error al iniciar sesión.");
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
          resolve(user);
        })
        .catch(err => {
          console.log(err);
          reject("Error al iniciar sesión.");
        });
    });
  }

  /**
   * This register in Firebase Autentication an user by email
   * @param email email from register page
   * @param password password from register page
   */
  registerUser(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err));
    });
   }
  getAFauth(): AngularFireAuth {
    return this.AFauth;
  }
}
