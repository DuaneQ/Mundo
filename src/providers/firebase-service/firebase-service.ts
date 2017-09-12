import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database'

import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  ref: any;
  data: any;
  auth: any;
  public userId:string;
  public setSettings :any;

  constructor(public afAuth:AngularFireAuth,
              public afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe( user => {
    this.userId = user.uid
    this.setSettings = this.afDatabase.database.ref(`/users/${user.uid}/settings`);
    });
  }

    addSettings(itineraryType:FirebaseObjectObservable<any>, 
                maxDistance:FirebaseObjectObservable<any>, 
                measurement:string):
    firebase.Promise<any>{
    return this.afDatabase.object(`/users/${this.userId}/settings`).set({ itineraryType, maxDistance, measurement });
  }

    getSettings(): FirebaseObjectObservable<any> {
    return this.afDatabase.object(`/users/${this.userId}/settings/`);
  }
}
