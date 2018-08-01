import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IndividMatchPage } from '../pages'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { IItinerary } from '../../models/itinerary'
import { CameraServiceProvider } from '../../providers/providers'
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

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
export class MatchesPage implements OnInit{

  private userId:string;
  myItineraryList$: any;
  matchItineraryList$: FirebaseListObservable<IItinerary[]>;
  findItineraryList$: FirebaseListObservable<IItinerary[]>;

  public category: string = 'findMatch';
  public categories: Array<string> = ['findMatch', 'myItin', 'matches']


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              private cameraServiceProvider: CameraServiceProvider,
              private afAuth: AngularFireAuth,) {

        this.afAuth.authState.subscribe(user => {
        this.userId = user.uid
      });              
  }
  
  ngOnInit(){
    const baseList = firebase.database().ref('itineraries');
    this.myItineraryList$ = baseList.orderByChild('userId').equalTo(this.userId);

    this.matchItineraryList$ =  this.afDatabase.list(`/itineraries/`);
    
    this.findItineraryList$ =  this.afDatabase.list(`/itineraries/`);
  }

    onTabChanged(tabName) {
    this.category = tabName;
  }
}
