import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage} from '../pages'
import { Facebook } from '@ionic-native/facebook'
import { FirebaseServiceProvider } from '../../providers/providers'
import firebase from 'firebase'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    userProfile: any = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public facebook: Facebook,
              public firebaseLogin: FirebaseServiceProvider) {
  }

  facebookLogin() {
    this.facebook.login(['email', 'public_profile']).then(result=>{
      const credentials=firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
      firebase.auth().signInWithCredential(credentials).then((success)=>{
            this.userProfile = success;
            this.firebaseLogin.setUpUser(credentials, success);
            this.navCtrl.setRoot(HomePage);
      })
    }).catch(err=>{
      alert(JSON.stringify(err))
    })
  }
}
