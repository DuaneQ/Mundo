import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IndividMatchPage } from '../pages'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { IItinerary } from '../../models/itinerary'
import { CameraServiceProvider } from '../../providers/providers'

/**
 * Generated class for the MatchesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  itineraryList$: FirebaseListObservable<IItinerary[]>;
  public category: string = 'findMatch';
  public categories: Array<string> = ['findMatch', 'myItin', 'matches']


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              private cameraServiceProvider: CameraServiceProvider) {
              
              this.itineraryList$ =  this.afDatabase.list(`/itineraries/`);
  }

    onTabChanged(tabName) {
    this.category = tabName;
  }
}
