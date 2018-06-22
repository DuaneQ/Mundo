import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage, TabsPage} from '../pages'
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus'
import { LoginServiceProvider } from '../../providers/providers'
import firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable'

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
    slides = [
    {
      title: "Welcome to Mundo",
      description: "Let's <b>Travel the World Together</b>",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "What is Mundo?",
      description: "Mundo connects travelers.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "How?",
      description: "Search for interesting itineraries and send requests to join them on their adventure!",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];

  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public facebook: Facebook,
              public firebaseLogin: LoginServiceProvider,
              private afAuth: AngularFireAuth,
              private gPlus: GooglePlus,
              private platform: Platform) {
              
              this.user = this.afAuth.authState;
  }

  facebookLogin() {
    this.facebook.login(['email', 'public_profile']).then(result=>{
      const credentials=firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
      firebase.auth().signInWithCredential(credentials).then((success)=>{
            this.userProfile = success;
            this.firebaseLogin.setUpUser(credentials, success);
            this.navCtrl.parent.select(2);
      })
    }).catch(err=>{
      alert(JSON.stringify(err))
    })
  }

  googleLogin(){
    if (this.platform.is('cordova')){
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gPlus.login({
        'webClientId' : '920843394799-agr1ul1hadm3bnl2f8bgmlgq6agjln95.apps.googleusercontent.com',
        'offline' : true,
        'scopes' : 'profile email'
      })

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then(() =>{
          this.navCtrl.setRoot(TabsPage);
      })
    } catch(err){
      console.log(err);
    }
  }

    async webGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.gPlus.login({
        'webClientId' : '920843394799-agr1ul1hadm3bnl2f8bgmlgq6agjln95.apps.googleusercontent.com',
        'offline' : true,
        'scopes' : 'profile email'
      })

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    } catch(err){
      console.log(err);
    }
  }
}
