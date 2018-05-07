import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import { FirebaseServiceProvider } from '../../providers/providers'
import { IItinerary } from '../../models/itinerary'

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

  startDate: string = new Date().toISOString();
  endDate: string = new Date().toISOString();
  destination: string;
  activities:string[] = []; 
  addActivities:string;
  itinerary: IItinerary;

  @ViewChild('destin') public destinElement: ElementRef;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private mapsApiLoader: MapsAPILoader,
              private ngZone: NgZone,
              private view: ViewController,
              private firebaseSvcProvider: FirebaseServiceProvider) {
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
                console.log(this.destination);
                this.itinerary.location = this.destination;
                console.log('itinerary ' + this.itinerary.location);
              });
            });
          }
        )
    }

  addActivity() {
        this.activities.push(this.addActivities);
        console.log(this.activities[0]);
        this.itinerary.activities = this.activities;
        console.log('itinerary loc ' + this.itinerary.activities);
  }

  closeModal(){
    this.view.dismiss();
  }

  deleteActivity(activity) {
        this.activities.splice(this.activities.indexOf(activity),1);
  }

  saveItinerary() {
    // this.firebaseSvcProvider.addItinerary(this.itinerary).then(() => {
    //                                       this.view.dismiss()});
        this.view.dismiss();
  }
}
