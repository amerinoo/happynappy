import { Injectable } from '@angular/core';

import { Nappy } from '../model/nappy';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NappyService {
  nappysRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.nappysRef = this.db.collection('nappy-list');
  }

  addNappy(nappy: Nappy) {
    this.nappysRef
      .add({
        who: nappy.who,
        date: nappy.date,
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }

  getAllNappy(): Observable<Nappy[]> {
    return this.nappysRef.valueChanges();
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}
