import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuerysService {

  private userRef: DocumentReference;
  clients: Observable<any[]>;
  user: User;

  constructor(private dataBase: AngularFirestore) { }


  /**
   * This method search and retrieve an user where email is the same as input
   * @param email email from page where user atributes needed
   */
  async currentUser(email: string) {
    const snapshotResult = await this.dataBase.collection('Users', ref =>
      ref.where('Email', '==', email).limit(1))
      .snapshotChanges()
      .pipe(flatMap(users => users));
    snapshotResult.subscribe(doc => {
      const userData = doc.payload.doc.data() as User;
      const userId = doc.payload.doc.id;
      const userRef = doc.payload.doc.ref;
      this.user = new User(userData.email, userData.name);
      this.user.uID = userId;
    });
    return this.user;
  }
  // Seguir completando consultas
}
