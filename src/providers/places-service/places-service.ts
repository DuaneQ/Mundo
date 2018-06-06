import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from 'tpes/googlemaps';
import 'rxjs/add/operator/map';

const GOOGLE_API = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
const API_KEY = "AIzaSyC7kG6CDB_L5ebyPatP9Ke94a_avwnLWUU";

/*
  Generated class for the PlacesServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PlacesServiceProvider {
  
  place: string;

  constructor(private mapsApiLoader: MapsAPILoader) {
  }
}
