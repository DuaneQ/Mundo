import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'
import { IItinerary } from '../../models/itinerary'

import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
  ref: any;
  data: any;
  auth: any;
  public userId:string;
  public setSettings :any;
  public setItineraries: any;
  public itineraryRef: FirebaseListObservable<IItinerary[]>;

  constructor(public afAuth:AngularFireAuth,
              public afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe( user => {
    this.userId = user.uid
    this.setSettings = this.afDatabase.database.ref(`/users/${user.uid}/settings`);
    this.setItineraries = this.afDatabase.database.ref(`/itineraries/${user.uid}/itinerary`);
    this.itineraryRef = this.afDatabase.list(`/itineraries/`);
    });
  }
    getUserId(): string{
      return this.userId;
    }

    addSettings(location:string, 
                intPlaces:string[], 
                bio:any,
                connectionNotifications:boolean, 
                messageNotifications:boolean,
                showTrips:boolean):

    firebase.Promise<any>{
    return this.afDatabase.object(`/users/${this.userId}/settings`).set({ location, 
                                  intPlaces, 
                                  bio, 
                                  connectionNotifications, 
                                  messageNotifications,
                                  showTrips});
  }

    getSettings(): FirebaseObjectObservable<any> {
    return this.afDatabase.object(`/users/${this.userId}/settings/`);
  }

    addItinerary(itinerary: IItinerary):

    firebase.Promise<any>{
    return this.afDatabase.list(`/itineraries/`).push({ itinerary});
  }

    getItineraryList():FirebaseListObservable<IItinerary[]> {
      return this.itineraryRef;
  }
  
}
