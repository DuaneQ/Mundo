import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database'

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

  constructor(public afd: AngularFireDatabase) {
  }

  getRootList(){
    return  this.afd.list('/users');
  }

  setUpUser(_credentials, _authData) {
    this.ref = this.afd.database.ref('/users/' + _authData.uid)
    this.data = {
      "provider": _authData.providerData[0],
      "avatar": (_credentials.imageUri || "missing"),
      "displayName": _authData.email,
    };

    return this.ref.set(this.data).then(function () {
      return this.data
    }).catch(function (_error) {
      return _error
    })
  }

  getFacebookProfilePic(){
    return this.ref('/provider')
  }
}
