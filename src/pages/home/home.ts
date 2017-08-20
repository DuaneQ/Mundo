import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { FirebaseServiceProvider } from '../../providers/providers'
import { AngularFireModule } from 'angularfire2';
import { auth } from 'firebase/app'
import { SettingsPage, InfoPage } from '../pages'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = null;

  constructor(public navCtrl: NavController,
              private facebook: Facebook,
              public afd: FirebaseServiceProvider) {
    }

    ionViewDidLoad() {
    this.user = firebase.auth().currentUser; // code from firebase docs
  }
  
    goToSettings(){
        this.navCtrl.push(SettingsPage); 
    }

        goToInfo(){
        this.navCtrl.push(InfoPage); 
    }
}
