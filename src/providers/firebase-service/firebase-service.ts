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

  getRootList(){
    return  this.afDatabase.list('/users');
  }

  setUpUser(_credentials, _authData) {
    this.ref = this.afDatabase.database.ref('/users/' + _authData.uid)
    this.data = {
      "provider": _authData.providerData[0],
      "avatar": (_credentials.imageUri || "missing"),
      "displayName": _authData.email,
    };
    this.auth = _authData;
    return this.ref.set(this.data).then(function () {
      return this.data
    }).catch(function (_error) {
      return _error
    })
  }

    addSettings(itineraryType:FirebaseObjectObservable<any>):
    firebase.Promise<any>{
    return this.afDatabase.object(`/users/${this.auth.uid}/settings`).set({ itineraryType });
  }

    getSettings(): FirebaseObjectObservable<any> {
    return this.afDatabase.object(`/users/${this.auth.uid}/settings/itineraryType`);
  }
}
