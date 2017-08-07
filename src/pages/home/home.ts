import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { FirebaseServiceProvider } from '../../providers/providers'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile: any = null;

  constructor(public navCtrl: NavController,
              private facebook: Facebook,
              public afd: FirebaseServiceProvider) {

      // this.userProfile = this.afd.getFacebookProfilePic();
  }



}
