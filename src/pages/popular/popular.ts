import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider, GeolocateServiceProvider, CameraServiceProvider } from '../../providers/providers'

/**
 * Generated class for the PopularPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popular',
  templateUrl: 'popular.html',
})
export class PopularPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocate: GeolocateServiceProvider) {
  }
}
