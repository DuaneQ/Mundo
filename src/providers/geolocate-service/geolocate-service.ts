import { Injectable } from '@angular/core';
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
    console.log('Hello GeolocateServiceProvider Provider');
  }

  onLocateUser(){
    this.geolocation.getCurrentPosition()
    .then(
      (location) => {
        console.log(location.coords.latitude + ' ' + location.coords.longitude)
      }
    )
    .catch(
      (error) => console.log('Error occurred retrieving location')
    );
  }
}
