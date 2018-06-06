import { Injectable, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import 'rxjs/add/operator/map';

/*
  Generated class for the GeolocateServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeolocateServiceProvider {

  constructor(private geolocation: Geolocation) {
  }

  onLocateUser(){
    this.geolocation.getCurrentPosition()
    .then(
      (location) => {
      }
    )
    .catch(
      (error) => console.log('Error occurred retrieving location')
    );
  }
}
