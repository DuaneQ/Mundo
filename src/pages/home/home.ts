import { Component, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { FirebaseServiceProvider, GeolocateServiceProvider } from '../../providers/providers'
import { AngularFireModule } from 'angularfire2';
import { auth } from 'firebase/app'
import { SettingsPage, InfoPage } from '../pages'
import { Storage } from '@ionic/storage';
import { MapsAPILoader } from '@agm/core';
import {} from 'types/googlemaps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  loggedInUser: any = null;
  
  @ViewChild('search') public searchElement: ElementRef;

  constructor(public navCtrl: NavController,
              private facebook: Facebook,
              public afd: FirebaseServiceProvider,
              private storage: Storage,
              private geolocate: GeolocateServiceProvider,
              private mapsApiLoader: MapsAPILoader,
              private ngZone: NgZone
              ) {
    }

    location: string;

    ionViewDidLoad() {
    this.loggedInUser = firebase.auth().currentUser; // code from firebase docs
    this.geolocate.onLocateUser();
  }

  ngOnInit(){
        this.mapsApiLoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, {types:['(cities)']});

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if(place.geometry === undefined || place.geometry === null){
              return;
            }
            this.location = place.formatted_address;
          });
        });
      }
    )
  }
  
  ionViewWillLeave(){
    console.log(this.location + ' test location');
  }
    goToSettings(){
        this.navCtrl.push(SettingsPage); 
    }

    goToInfo(){
        this.navCtrl.push(InfoPage); 
    }
}
