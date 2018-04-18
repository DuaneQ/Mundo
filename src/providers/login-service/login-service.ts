import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'

import 'rxjs/add/operator/map';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

ref: any;
  data: any;
  auth: any;
  public userId:string;
  public setSettings :any;

  constructor(public afAuth:AngularFireAuth,
              public afDatabase: AngularFireDatabase) {
  }

  setUpUser(_credentials, _authData) {
    this.ref = this.afDatabase.database.ref('/users/' + _authData.uid)
    this.data = {
      "provider": _authData.providerData[0],
      "avatar": (_credentials.imageUri || "missing"),
      "email": _authData.email,
    };
    this.auth = _authData;
    return this.ref.set(this.data).then(function () {
    return this.data
    }).catch(function (_error) {
      return _error
    })
  }
}
