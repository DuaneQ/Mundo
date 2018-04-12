import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/providers'
import { 
  AngularFireDatabase, 
  FirebaseListObservable, 
  FirebaseObjectObservable } from 'angularfire2/database';
import { EmailComposer } from '@ionic-native/email-composer';
import { TermsPage, LicensesPage, PrivacypolicyPage, LoginPage } from '../pages'
import { Facebook } from '@ionic-native/facebook'
import firebase from 'firebase';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  itineraryType: FirebaseObjectObservable<any>;
  maxDistance: FirebaseObjectObservable<any>;
  public settings: any;
  measurement: string = "Miles";
  connectionNotifications: boolean = true;
  messageNotifications: boolean = true;
  
  genders = [
    { name: 'Female'},
    { name: 'Male'},
    { name: 'Groups'},
    { name: 'Couples'},
  ];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public actionsheetCtrl: ActionSheetController,
              public platform: Platform,
              public firebaseSvcProvider: FirebaseServiceProvider,
              private emailComposer: EmailComposer,
              public facebook: Facebook,) {
  }

  // ionViewDidLeave() {
  //     this.firebaseSvcProvider.addSettings(this.itineraryType, 
  //                                         this.maxDistance, 
  //                                         this.measurement, 
  //                                         this.connectionNotifications,
  //                                         this.messageNotifications);
  //   }

  // ionViewDidLoad() {
  //     this.firebaseSvcProvider.getSettings().subscribe( firebaseSettings => {
  //     this.settings = firebaseSettings;
  //     this.itineraryType = (typeof this.settings.itineraryType === 'undefined') ? 'Groups' : this.settings.itineraryType;
  //     this.maxDistance = (typeof this.settings.maxDistance === 'undefined') ? 50 : this.settings.maxDistance;
  //     this.measurement = (typeof this.settings.measurement === 'undefined') ? 'Miles' : this.settings.measurement;
  //     this.connectionNotifications = (typeof this.settings.connectionNotifications === 'undefined') ? true : this.settings.connectionNotifications;
  //     this.messageNotifications = (typeof this.settings.messageNotifications === 'undefined') ? true : this.settings.messageNotifications;
  //      });
  //   }

    sendHelpEmail() {
      let email = {
        to: 'DuaneQHodges@gmail.com',

        subject: 'Test',
        body: '',
        isHtml: true
      };
  
      this.emailComposer.open(email);
    }

    goToPrivacyPolicy(){
        this.navCtrl.push(PrivacypolicyPage); 
    }

    goToTerms(){
        this.navCtrl.push(TermsPage); 
    }

    goToLicenses(){
        this.navCtrl.push(LicensesPage); 
    }

    logoutOfFacebook():firebase.Promise<void> {
          //const userId:string = firebase.auth().currentUser.uid;
          //firebase.database().ref('/users/${userId}').off();
          return firebase.auth().signOut().then(() => {
            this.navCtrl.setRoot(LoginPage);
          }); 
    }
}