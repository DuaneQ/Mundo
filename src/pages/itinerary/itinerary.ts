import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { FirebaseServiceProvider } from '../../providers/providers'
import { IItinerary } from '../../models/itinerary'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ItineraryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-itinerary',
  templateUrl: 'itinerary.html',
})
export class ItineraryPage implements OnInit{

  startDate: string;
  endDate: string;
  schedule={
    sdate: "",
    edate: ""
  }
  todaysDate: String = Date.now.toString();
  destination: string;
  tripDetails: string = null;
  activities:string[] = []; 
  addActivities:string;
  itineraryList$: FirebaseListObservable<IItinerary[]>;
  private userId:string;

  @ViewChild('destin') public destinElement: ElementRef;

  constructor(private mapsApiLoader: MapsAPILoader,
              private ngZone: NgZone,
              private view: ViewController,
              private firebaseSvcProvider: FirebaseServiceProvider,
              public afDatabase: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
                        
              this.afAuth.authState.subscribe(user => {
              this.userId = user.uid});

              this.itineraryList$ =  this.afDatabase.list(`/itineraries/`);
  }

  ngOnInit(){
        this.mapsApiLoader.load().then(
        () => {
          let autocomplete = new google.maps.places.Autocomplete(this.destinElement.nativeElement, {types:['(cities)']});

          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                if(place.geometry === undefined || place.geometry === null){
                  return;
              }
                this.destination = place.formatted_address;
              });
            });
          }
        )
    }

  addActivity() {
        this.activities.push(this.addActivities);
  }

  closeModal(){
    this.view.dismiss();
  }

  deleteActivity(activity) {
        this.activities.splice(this.activities.indexOf(activity),1);
  }

  saveItinerary() {
    let itinerary: IItinerary = {
        startDate: this.startDate,
        endDate: this.endDate,
        destination: this.destination,
        activities: this.activities,
        tripDetails: this.tripDetails,
        userId: this.userId
    }
    this.firebaseSvcProvider.addItinerary(itinerary).then(() => {
                                          this.view.dismiss()});
  }
}
