import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage, ListPage, LoginPage, TabsPage} from '../pages/pages'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    // AF2 Settings
  firebase.initializeApp({
    apiKey: "AIzaSyAXX54EgG7dHbs-lgm_uRheJm-1Q-4NBGk",
    authDomain: "fir-92abc.firebaseapp.com",
    databaseURL: "https://fir-92abc.firebaseio.com",
    projectId: "fir-92abc",
    storageBucket: "fir-92abc.appspot.com",
    messagingSenderId: "920843394799"
});

    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if(!user){
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
