import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/providers'
import { 
  AngularFireDatabase, 
  FirebaseListObservable, 
  FirebaseObjectObservable } from 'angularfire2/database';

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
              public firebaseSvcProvider: FirebaseServiceProvider) {
  }

  ionViewDidLeave() {
      this.firebaseSvcProvider.addSettings(this.itineraryType, this.maxDistance, this.measurement);
    }

  ionViewDidLoad() {
      this.firebaseSvcProvider.getSettings().subscribe( firebaseSettings => {
      this.settings = firebaseSettings;
      this.itineraryType = this.settings.itineraryType;
      this.maxDistance = this.settings.maxDistance;
      this.measurement = this.settings.measurement;
       });
    }
  }