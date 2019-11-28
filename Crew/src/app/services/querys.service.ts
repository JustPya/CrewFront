import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuerysService {

  private userRef: DocumentReference;
  user: Observable<User>;

  constructor(private dataBase: AngularFirestore) { }

  // Seguir completando consultas
}
