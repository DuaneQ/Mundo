import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';

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

  @ViewChild('destin') public destinElement: ElementRef;

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private mapsApiLoader: MapsAPILoader,
              private ngZone: NgZone,
              private view: ViewController) {
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

  closeModal(){
    this.view.dismiss();
  }
}
